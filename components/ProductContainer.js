import { StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../constants/COLORS";
import { Icon } from "@rneui/themed";

const ProductContainer = ({ product, index, handleDelete = null }) => {
  const subtotal = product.price * product.unit;
  const discount = (subtotal * (product.discount / 100)).toFixed(2);
  const tax = ((subtotal - discount) * (product.tax / 100)).toFixed(2);
  return (
    <View
      style={{
        marginTop: 6,
        backgroundColor: COLORS.whiteSmoke,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderColor: COLORS.grey,
        borderWidth: 2,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {handleDelete && (
            <Icon
              onPress={() => handleDelete(index)}
              style={{ marginRight: 5 }}
              name="minuscircleo"
              type="ant-design"
              size={15}
            />
          )}
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {product.itemName}
          </Text>
        </View>
        <Text style={{ fontWeight: "bold" }}>₹ {product.price}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 12 }}>Item Subtotal</Text>
        <Text style={{ fontSize: 12 }}>
          {product.unit} unit x {product.price} = ₹ {subtotal}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 12, color: "orange" }}>
          Discount (%): {product.discount}
        </Text>
        <Text style={{ fontSize: 12, color: "orange" }}>₹ {discount}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 12, color: "orange" }}>Tax GST@18%</Text>
        <Text style={{ fontSize: 12, color: "orange" }}>₹ {tax}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold" }}>Total</Text>
        <Text style={{ fontWeight: "bold" }}>₹ {product.total}</Text>
      </View>
    </View>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({});
