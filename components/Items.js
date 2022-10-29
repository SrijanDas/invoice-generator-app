// import itemsData from "../assets/data/itemsData";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";

const Items = () => {
  const [itemsData, setItemsData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("itemsList");
        setItemsData(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch (e) {
        // error reading value
        alert(e.message);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView>
      {itemsData.length ? (
        itemsData.map((item, i) => (
          <TouchableOpacity key={i}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {item.itemName}
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
                    <Text style={{ color: "#808080", fontSize: 12 }}>
                      Price
                    </Text>
                    <Text style={{ fontSize: 15 }}>₹ {item.salePrice}</Text>
                  </View>
                  <View>
                    <Text style={{ color: "#808080", fontSize: 12 }}>
                      Net Price
                    </Text>
                    <Text style={{ fontSize: 15 }}>{item.netPrice}</Text>
                  </View>
                  <View>
                    <Text style={{ color: "#808080", fontSize: 12 }}>
                      Available Stock
                    </Text>
                    <Text style={{ fontSize: 15 }}>{item.availableStock}</Text>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))
      ) : (
        <View style={{ padding: 15 }}>
          <Text style={{}}>No items to show</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Items;
