import { View, Text } from "react-native";
import React from "react";

const StatsContainer = ({ title, data }) => {
  return (
    <View>
      <Text style={{ color: "#808080", fontSize: 12 }}>{title}</Text>
      <Text style={{ fontSize: 15 }}>{data}</Text>
    </View>
  );
};

export default StatsContainer;
