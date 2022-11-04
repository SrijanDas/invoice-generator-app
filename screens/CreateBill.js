import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import dateFormat from "dateformat";
import * as React from "react";
import { Button, Icon, Input } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import COLORS from "../constants/COLORS";
import { ProductContainer } from "../components";

const CreateBill = ({ navigation, route }) => {
  const { oldData } = route.params;

  const [name, set_Name] = useState(oldData?.name ? oldData.name : "");
  const [Address, Set_Address] = useState(
    oldData?.address ? oldData.address : ""
  );
  const [Mobile_No, Set_Mobile_No] = useState(
    oldData?.mobileNo ? oldData.mobileNo : ""
  );
  // const [Quantity, setQuantity] = useState("");
  const [Invoice, setInvoice] = useState(route.params.invoiceNo);
  const [products, setProducts] = useState(
    oldData?.products ? oldData.products : []
  );
  const [Total, setTotal] = useState("");
  const [ReceivedBalance, SetReceivedBalance] = useState("");
  const [PaymentType, setPaymentType] = useState("Cash");
  const [RemaningBalance, setRemaningBalance] = useState("Paid");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (route.params?.total) {
      setTotal(route.params.total);
    }
  }, [route.params?.total]);

  // date picker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const createBill = async () => {
    if (!name.length || !Total.length) {
      console.log(name, Total);
      alert("Please fill all the mandatory fields ( * )");
      return;
    }
    setIsloading(true);

    const newBill = {
      name,
      date: dateFormat(date, "dd/mm/yyyy"),
      address: Address,
      mobileNo: Mobile_No,
      invoice: Invoice,
      products,
      total: Total,
      receivedBalance: ReceivedBalance,
      paymentType: PaymentType,
      remaningBalance: RemaningBalance,
    };

    try {
      let newSalesData = [];

      const salesData = await AsyncStorage.getItem("salesData");

      if (salesData != null) {
        // item data exists add to the list
        newSalesData = [...JSON.parse(salesData), newBill];
      } else {
        // // item data does not exist
        // create new item data list and add it to the list
        newSalesData.push(newBill);
      }

      await AsyncStorage.setItem("salesData", JSON.stringify(newSalesData));

      // restoring states
      set_Name("");
      setInvoice(newSalesData.length + 1);
      setTotal("");
      setProducts([]);
      SetReceivedBalance("");
      Set_Address("");
      Set_Mobile_No("");
      setIsloading(false);

      navigation.navigate({
        name: "Preview",
        params: { salesData: newSalesData, newBill: newBill },
        // merge: true,
      });
      // console.log("created bill");
    } catch (e) {
      // saving error
      alert(e.message);
    }
    // console.log("created bill");
  };

  // console.log(oldData);
  // console.log("Total", oldData?.total, Total);

  const handleDelete = (index) => {
    if (index > -1) {
      // only splice array when item is found
      let itemToRemove = products[index];
      setTotal(Total - itemToRemove.total);
      let tempProducts = products;
      tempProducts.splice(index, 1); // 2nd parameter means remove one item only
      setProducts(tempProducts);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBtnContainer}>
          <TouchableOpacity style={styles.topBtn}>
            <Text style={{ color: "#808080" }}>Invoice No.</Text>
            <Text style={{ fontSize: 15 }}>{Invoice}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.topBtn}
          >
            <Text style={{ color: "#808080" }}>Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                {dateFormat(date, "dd/mm/yyyy")}
              </Text>
              <Icon
                style={{ marginLeft: 2 }}
                name="down"
                type="antdesign"
                color="#808080"
                size={14}
              />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {/* <OutlinedTextField label="Phone number" keyboardType="phone-pad" /> */}
          <View style={styles.InputContainer}>
            <Text>Name* :</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => set_Name(text)}
              value={name}
              placeholder="Full Name"
              autoFocus
            />
          </View>

          <View style={styles.InputContainer}>
            <Text>Mobile No : </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={(text) => Set_Mobile_No(text)}
              value={Mobile_No}
              placeholder="Mobile No"
            />
          </View>
          {products.length ? (
            <View style={{ padding: 15 }}>
              <View
                style={{
                  backgroundColor: COLORS.lightblue,
                  flexDirection: "row",
                  borderRadius: 6,
                  padding: 8,
                }}
              >
                <Icon
                  name="arrow-drop-down-circle"
                  type="materialicons"
                  color="white"
                  size={16}
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "white" }}>Billed Items</Text>
              </View>

              {products.map((p, i) => (
                <ProductContainer
                  key={i}
                  product={p}
                  index={i}
                  handleDelete={handleDelete}
                />
              ))}
            </View>
          ) : null}
          <View style={styles.InputContainer}>
            <Button
              buttonStyle={{ borderRadius: 3 }}
              type="outline"
              title="Add Item"
              onPress={() =>
                navigation.navigate("AddItems", {
                  invoiceNo: Invoice,
                  billData: {
                    name,
                    mobileNo: Mobile_No,
                    products,
                    total: Total,
                  },
                })
              }
            >
              <Icon
                name="pluscircle"
                type="ant-design"
                size={20}
                color="#1e90ff"
                style={{ marginRight: 5 }}
              />
              Add Items
            </Button>
          </View>
          <View style={styles.bottomRow}>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Total Amount*
            </Text>
            <Input
              leftIcon={{ type: "font-awesome", name: "rupee", size: 18 }}
              placeholder=""
              containerStyle={{ width: 150 }}
              keyboardType="number-pad"
              onChangeText={(text) => setTotal(text)}
              value={Total.toString()}
            />
          </View>
        </ScrollView>
      </View>
      <Button
        onPress={createBill}
        buttonStyle={{ height: 60 }}
        loading={isloading}
      >
        Create Bill
      </Button>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  topBtnContainer: {
    flexDirection: "row",
  },
  topBtn: {
    borderRadius: 3,
    height: 60,
    width: "50%",
    marginVertical: 10,
    borderColor: "rgba(244, 244, 244, 1)",
    borderRightWidth: 2,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
  button: {
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 4,
  },
  InputContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    // width:100,
    marginTop: 4,
    height: 40,
    borderColor: "#a9a9a9",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    marginBottom: 6,
    paddingLeft: 8,
  },
  PickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
  },
  CreateInvoiceButton: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
});

export default CreateBill;
