import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import itemsData from "../assets/data/itemsData";
import { Button, Icon, Input } from "@rneui/themed";
import { useState } from "react";

const AddItems = ({ navigation }) => {
  const [items, setItems] = useState([]);
  return (
    <>
      <View style={styles.container}>
        {/* <Text style={{ fontSize: 20, marginBottom: 15 }}>Item 1</Text> */}
        <View style={styles.pickerContainer}>
          <Picker mode="dropdown">
            {itemsData.map((item, i) => (
              <Picker.Item
                key={i}
                label={`${item.name}   ${item.available_stock}`}
                value={item.name}
              />
            ))}
          </Picker>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            placeholder="Quantity"
            keyboardType="number-pad"
            style={styles.input}
          />
          <TextInput
            placeholder="Total"
            keyboardType="number-pad"
            style={styles.input}
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
        />

        <Button
          buttonStyle={{ height: "100%" }}
          title="Save"
          color="crimson"
          containerStyle={{ width: "50%" }}
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
});

export default AddItems;
