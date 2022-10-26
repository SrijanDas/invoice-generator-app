import itemsData from "../assets/data/itemsData";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, ListItem } from "@rneui/themed";

const Items = () => {
  return (
    <ScrollView>
      {itemsData.map((item, i) => (
        <TouchableOpacity key={i}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: "bold" }}>
                {item.name}
              </ListItem.Title>

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
                  <Text style={{ color: "#808080", fontSize: 12 }}>Price</Text>
                  <Text style={{ fontSize: 15 }}>₹ {item.price}</Text>
                </View>
                <View>
                  <Text style={{ color: "#808080", fontSize: 12 }}>Unit</Text>
                  <Text style={{ fontSize: 15 }}>{item.uom}</Text>
                </View>
                <View>
                  <Text style={{ color: "#808080", fontSize: 12 }}>
                    Available Stock
                  </Text>
                  <Text style={{ fontSize: 15 }}>{item.available_stock}</Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Items;
