// import itemsData from "../assets/data/itemsData";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, ListItem, Icon } from "@rneui/themed";
import StatsContainer from "./StatsContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Items = ({ navigation, itemsData, setItemsData }) => {
  const handleDelete = async (itemToDelete) => {
    try {
      const jsonValue = await AsyncStorage.getItem("itemsList");
      let itemsList = jsonValue != null ? JSON.parse(jsonValue) : [];
      let newList = itemsList.filter(
        (item) => item.itemName !== itemToDelete.itemName
      );
      setItemsData(newList);
      await AsyncStorage.setItem("itemsList", JSON.stringify(newList));
    } catch (e) {
      // error reading value
      alert(e.message);
    }
  };
  return (
    <ScrollView>
      {itemsData.length ? (
        itemsData.map((item, i) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ItemDetails", { item })}
            key={i}
          >
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
                  <StatsContainer title="Sell Price" data={item.sellPrice} />
                  <StatsContainer title="Net Price" data={item.netPrice} />
                  <StatsContainer title="In Stock" data={item.closingStock} />
                  <TouchableOpacity onPress={() => handleDelete(item)}>
                    <Icon
                      size={18}
                      color="#808080"
                      name="delete"
                      type="ant-design"
                    />
                  </TouchableOpacity>
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
