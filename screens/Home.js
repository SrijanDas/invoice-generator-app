import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FAB, Tab, Text, TabView, ListItem, Button, Icon } from "@rneui/themed";
import { useState } from "react";
import { salesData } from "../assets/data";

const Home = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  return (
    <>
      <StatusBar />
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Transactions"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "timer", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Items"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "inventory", type: "materialIcons", color: "white" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView>
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
                        <Text style={{ color: "#808080" }}>#{i + 1}</Text>
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
                        <Text style={{ color: "#808080", fontSize: 12 }}>
                          Total
                        </Text>
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
                        <TouchableOpacity style={{ marginRight: 20 }}>
                          <Icon name="print" color="#808080" type="ionicons" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon name="share" color="#808080" type="ionicons" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <Text h1>Items</Text>
        </TabView.Item>
      </TabView>

      <FAB
        visible={visible}
        icon={{ name: "add", color: "white" }}
        color="#1e90ff"
        placement="right"
        title="New Bill"
        onPress={() => navigation.navigate("CreateBill")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default Home;
