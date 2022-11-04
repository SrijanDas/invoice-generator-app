import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Icon, Input } from "@rneui/themed";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../constants/COLORS";
import { StatsContainer } from "../components";

const AddItems = ({ navigation, route }) => {
  const [itemsData, setItemsData] = useState([]);
  const [product, setProduct] = useState("");
  const [itemIndex, setItemIndex] = useState(0);
  const [priceType, setPriceType] = useState("netPrice");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [box, setBox] = useState("");
  const [tax, setTax] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [total, setTotal] = useState("");

  // loading items
  useEffect(() => {
    const getItemsData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("itemsList");
        if (jsonValue != null) {
          const data = await JSON.parse(jsonValue);
          setItemsData(data);
          setProduct(data[0].itemName);
          setPrice(data[0].netPrice);
        }
      } catch (e) {
        // error reading value
        alert(e.message);
      }
    };

    getItemsData();
  }, []);

  const handlePriceTypeChnage = (itemValue, itemIndex) => {
    setPriceType(itemValue);
    if (itemValue === "netPrice") {
      setPrice(itemsData[itemIndex].netPrice);
    } else {
      setPrice(itemsData[itemIndex].sellPrice);
    }
  };

  const handleUnitChange = (t) => {
    setUnit(t);
    setTotal(t * price);
  };

  const handleDiscount = (itemValue, itemIndex) => {
    setDiscount(itemValue);
    if (itemValue === "0") {
      setTotal(unit * price);
      setTax("0");
      return;
    } else if (itemValue == "5") {
      let oldTotal = Number(total);
      let newtotal = Number(oldTotal - oldTotal * 0.05).toFixed(2);
      setTotal(newtotal);
    }
  };

  const handleTax = (itemValue, itemIndex) => {
    setTax(itemValue);
    if (itemValue === "0") {
      setTotal(unit * price);
      setDiscount("0");
      return;
    } else if (itemValue == "18") {
      let oldTotal = Number(total);
      let newtotal = Number(oldTotal + oldTotal * 0.18).toFixed(2);
      setTotal(newtotal);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {itemsData.length ? (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={product}
              style={styles.Picker}
              onValueChange={(itemValue, itemIndex) => {
                setProduct(itemValue);
                setItemIndex(itemIndex);
              }}
            >
              {itemsData.map((item, i) => (
                <Picker.Item
                  key={i}
                  value={item.itemName}
                  label={`${item.itemName} ( In Stock: ${item.closingStock} )`}
                  style={{
                    color: item.closingStock < 0 ? "red" : "black",
                  }}
                />
              ))}
            </Picker>
          </View>
        ) : (
          <Text>No items found</Text>
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "48%" }}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={priceType}
                onValueChange={handlePriceTypeChnage}
              >
                <Picker.Item label="Net Price" value="netPrice" />
                <Picker.Item label="Sell Price" value="sellPrice" />
              </Picker>
            </View>
          </View>
          <View
            style={{
              marginTop: 12,
              alignItems: "center",
              width: "50%",
            }}
          >
            {product !== "" && (
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: COLORS.blue,
                }}
              >
                {priceType === "netPrice"
                  ? itemsData[itemIndex].netPrice
                  : itemsData[itemIndex].sellPrice}
              </Text>
            )}
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            placeholder="Unit"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={handleUnitChange}
            value={unit}
          />
          <TextInput
            placeholder="Box"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(t) => setBox(t)}
            value={box}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <View style={{ width: "48%" }}>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={discount} onValueChange={handleDiscount}>
                <Picker.Item label="No Discount" value="0" />
                <Picker.Item label="5% Discount" value="5" />
              </Picker>
            </View>
          </View>
          <View style={{ width: "48%" }}>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={tax} onValueChange={handleTax}>
                <Picker.Item label="No Tax" value="0" />
                <Picker.Item label="18% gst" value="18" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Total</Text>
          <Input
            leftIcon={{ type: "font-awesome", name: "rupee", size: 18 }}
            placeholder=""
            containerStyle={{ width: 150 }}
            keyboardType="number-pad"
            onChangeText={(text) => setTotal(text)}
            value={total.toString()}
          />
        </View>
      </View>
      <View style={styles.bottomBtnContainer}>
        <Button
          titleStyle={{ color: "black" }}
          title="Cancel"
          color="white"
          buttonStyle={{ height: "100%" }}
          containerStyle={{ width: "50%" }}
          onPress={() => navigation.goBack()}
        />

        <Button
          buttonStyle={{ height: "100%" }}
          title="Save"
          color="crimson"
          containerStyle={{ width: "50%" }}
          onPress={() => {
            let newItem = {
              itemName: product,
              itemIndex,
              priceType,
              price,
              unit,
              box,
              tax,
              discount,
              total,
            };
            navigation.navigate({
              name: "CreateBill",
              params: {
                invoiceNo: route.params.invoiceNo,
                oldData: {
                  ...route.params.billData,
                  products: route.params.billData.products.push(newItem),
                },
                total: (
                  Number(route.params.billData.total) + Number(total)
                ).toFixed(2),
              },
              merge: true,
            });
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "white",
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a9a9a9",
    marginBottom: 15,
  },
  bottomBtnContainer: {
    height: 60,
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 55,
    width: "48%",
    borderColor: "#a9a9a9",
  },
  bottomRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: COLORS.lightgrey,
    borderRadius: 5,
  },
});

export default AddItems;
