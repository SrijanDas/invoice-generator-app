import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatsContainer } from "../components";
import { Button, Icon } from "@rneui/themed";

const ItemDetails = ({ navigation, route }) => {
  const { availableStock, itemName, salePrice, netPrice, others } =
    route.params.item;

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: "#808080" }}>{itemName}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          <StatsContainer title="Sale Price" data={"₹ " + salePrice} />
          <StatsContainer title="Net Price" data={"₹ " + netPrice} />
          <StatsContainer title="In Stock" data={availableStock} />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          type="outline"
          color="white"
          titleStyle={{ color: "black" }}
          buttonStyle={{ height: "100%" }}
          containerStyle={{ width: "50%", height: 60 }}
          onPress={() => {
            console.log("edit");
          }}
        >
          <Icon style={{ marginRight: 5 }} name="edit" type="MaterialIcons" />
          Edit Item
        </Button>
        <Button
          icon={() => (
            <Icon
              style={{ marginRight: 5 }}
              color="white"
              name="delete"
              type="ant-design"
            />
          )}
          title="Delete"
          color="crimson"
          buttonStyle={{ height: "100%" }}
          containerStyle={{ width: "50%", height: 60 }}
          onPress={() => {
            console.log("delete");
          }}
        />
      </View>
    </>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "white",
    flex: 1,
  },
});
