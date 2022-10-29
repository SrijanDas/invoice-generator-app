import { View, Text, TextInput, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

const NewItem = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>Item Name</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            placeholder="Item Name"
            autoFocus
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Unit of Measure (UOM)</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            // placeholder="useless placeholder"
            // keyboardType="numeric"
            placeholder="Unit of Measure"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Sale Price</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            // placeholder="useless placeholder"
            // keyboardType="numeric"
            placeholder="Sale Price"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Available Stock</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            // placeholder="useless placeholder"
            // keyboardType="numeric"
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
        />
        <Button
          title="Save"
          color="crimson"
          buttonStyle={{ height: "100%" }}
          containerStyle={{ width: "50%", height: 60 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
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
