import { StyleSheet, StatusBar } from "react-native";
import { FAB, Tab, TabView } from "@rneui/themed";
import { Sales, Items } from "../components";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation, route }) => {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  // items
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

    console.log("useeffect triggered");
    if (route.params?.itemsData) {
      setItemsData(route.params.itemsData);
    } else {
      getData();
    }
  }, [route.params?.itemsData]);

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
        <TabView.Item style={{ width: "100%", height: "auto" }}>
          <Sales />
        </TabView.Item>
        <TabView.Item style={{ width: "100%", height: "auto" }}>
          <Items itemsData={itemsData} />
        </TabView.Item>
      </TabView>

      {index === 0 ? (
        <FAB
          visible={visible}
          icon={{ name: "add", color: "white" }}
          color="#1e90ff"
          placement="right"
          title="New Bill"
          onPress={() => navigation.navigate("CreateBill")}
        />
      ) : (
        <FAB
          visible={visible}
          icon={{ name: "add", color: "white" }}
          color="crimson"
          placement="right"
          title="New Item"
          onPress={() => navigation.navigate("NewItem")}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Home;
