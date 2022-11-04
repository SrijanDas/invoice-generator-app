// import salesData from "../assets/data/salesData";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, ListItem, Icon } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StatsContainer from "./StatsContainer";
import { useNavigation } from "@react-navigation/native";
import dateFormat from "dateformat";

const Sales = ({ salesData, setSalesData }) => {
  const navigation = useNavigation();

  const handleDelete = async (invoice) => {
    try {
      const jsonValue = await AsyncStorage.getItem("salesData");
      let sales = jsonValue != null ? JSON.parse(jsonValue) : [];
      let newList = sales.filter((sale) => sale.invoice !== invoice);
      setSalesData(newList);
      await AsyncStorage.setItem("salesData", JSON.stringify(newList));
    } catch (e) {
      // error reading value
      alert(e.message);
    }
  };
  return (
    <ScrollView style={{ marginBottom: 50 }}>
      {salesData.map((sale, i) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({ name: "BillDetails", params: { sale } })
          }
          key={i}
        >
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
                    {dateFormat(sale.date, "dd/mm/yyyy")}
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
                <StatsContainer title="" data="" />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleDelete(sale.invoice)}
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
