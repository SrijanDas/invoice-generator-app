import { View, Text, TextInput, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewItem = ({ navigation }) => {
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [netPrice, setNetPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [availableStock, setAvailableStock] = useState("");

  const handleSubmit = async () => {
    if (itemName === "") {
      alert("Item name cannot be empty");
      return;
    }

    try {
      const itemsList = await AsyncStorage.getItem("itemsList");

      const newItem = {
        itemName,
        itemCode,
        netPrice,
        salePrice,
        availableStock,
      };

      if (itemsList != null) {
        // item data exists add to the list
        let newItemsList = [...JSON.parse(itemsList), newItem];
        await AsyncStorage.setItem("itemsList", JSON.stringify(newItemsList));
      } else {
        // // item data does not exist
        // create new item data list and add it to the list
        await AsyncStorage.setItem("itemsList", JSON.stringify([newItem]));
      }

      navigation.goBack();
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
        <View style={styles.inputContainer}>
          <Text>Item Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setItemName(text)}
            value={itemName}
            placeholder="Item Name"
            autoFocus
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Item Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setItemCode(text)}
            value={itemCode}
            // keyboardType="numeric"
            placeholder="Item Code"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Net Price</Text>
          <TextInput
            style={styles.input}
            onChangeText={(t) => setNetPrice(t)}
            value={netPrice}
            keyboardType="numeric"
            placeholder="Net Price"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Sale Price</Text>
          <TextInput
            style={styles.input}
            onChangeText={(t) => setSalePrice(t)}
            value={salePrice}
            keyboardType="numeric"
            placeholder="Sale Price"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Available Stock</Text>
          <TextInput
            style={styles.input}
            onChangeText={(t) => setAvailableStock(t)}
            value={availableStock}
            keyboardType="numeric"
            placeholder="Available Stock"
          />
        </View>
      </SafeAreaView>

      <View style={{ flexDirection: "row" }}>
        <Button
          title="Cancel"
          type="outline"
          color="white"
          titleStyle={{ color: "black" }}
          buttonStyle={{ height: "100%" }}
          containerStyle={{ width: "50%", height: 60 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          title="Save"
          color="crimson"
          buttonStyle={{ height: "100%" }}
          containerStyle={{ width: "50%", height: 60 }}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#a9a9a9",
    padding: 10,
    fontSize: 16,
  },
});

export default NewItem;
