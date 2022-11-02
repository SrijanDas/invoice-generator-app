// import salesData from "../assets/data/salesData";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, ListItem, Icon } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Sales = ({ salesData, setSalesData }) => {
  const handleDelete = async () => {
    await AsyncStorage.clear();
    setSalesData([]);
  };
  return (
    <ScrollView style={{ marginBottom: 50 }}>
      {salesData.map((sale, i) => (
        <TouchableOpacity key={i}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {sale.name}
                </ListItem.Title>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ color: "#808080" }}>
                    {new Date().toLocaleDateString()}
                  </Text>
                  <Text style={{ color: "#808080" }}>#{sale.invoice}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 5,
                }}
              >
                <View>
                  <Text style={{ color: "#808080", fontSize: 12 }}>Total</Text>
                  <Text style={{ fontSize: 15 }}>₹ {sale.total}</Text>
                </View>
                <View>
                  <Text style={{ color: "#808080", fontSize: 12 }}>
                    Balance
                  </Text>
                  <Text style={{ fontSize: 15 }}>₹ {sale.balance}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={handleDelete}
                    style={{ marginRight: 20 }}
                  >
                    <Icon
                      name="delete"
                      color="#808080"
                      type="MaterialCommunityIcons"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      name="share-a"
                      color="#808080"
                      type="fontisto"
                      size={17}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Sales;
