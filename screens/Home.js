import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FAB, Tab, TabView } from "@rneui/themed";
import { Sales, Items } from "../components";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../constants/COLORS";

const Home = ({ navigation, route }) => {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  // sales
  const [salesData, setSalesData] = useState([]);
  // console.log(salesData);
  useEffect(() => {
    const getSalesData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("salesData");
        setSalesData(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch (e) {
        // error reading value
        alert(e.message);
      }
    };
    if (route.params?.salesData) {
      setSalesData(route.params.salesData);
    } else {
      getSalesData();
    }
    return () => {
      setSalesData([]); // This worked for me
    };
  }, [route.params?.salesData]);

  // items
  const [itemsData, setItemsData] = useState([]);
  useEffect(() => {
    const getItemsData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("itemsList");
        setItemsData(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch (e) {
        // error reading value
        alert(e.message);
      }
    };
    if (route.params?.itemsData) {
      setItemsData(route.params.itemsData);
    } else {
      getItemsData();
    }
  }, [route.params?.itemsData]);

  return (
    <>
      <StatusBar style="auto" />
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: COLORS.blue,
          height: 3,
        }}
        // variant="default"
      >
        <Tab.Item
          title="Transactions"
          titleStyle={{ fontSize: 12, color: "black" }}
          icon={{ name: "timer", type: "ionicon", color: COLORS.blue }}
          containerStyle={(active) => ({
            backgroundColor: active ? "white" : undefined,
          })}
        />
        <Tab.Item
          title="Items"
          titleStyle={{ fontSize: 12, color: "black" }}
          icon={{
            name: "inventory",
            type: "materialIcons",
            color: COLORS.blue,
          }}
          containerStyle={(active) => ({
            backgroundColor: active ? "white" : undefined,
          })}
        />
        {/* <Tab.Item
          title="Party"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "inventory", type: "materialIcons", color: "white" }}
        /> */}
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%", height: "auto" }}>
          <Sales salesData={salesData} />
        </TabView.Item>
        <TabView.Item style={{ width: "100%", height: "auto" }}>
          <Items
            navigation={navigation}
            itemsData={itemsData}
            setItemsData={setItemsData}
          />
        </TabView.Item>
      </TabView>

      {index === 0 ? (
        <FAB
          visible={visible}
          icon={{ name: "add", color: "white" }}
          color="#1e90ff"
          placement="right"
          title="New Bill"
          onPress={() =>
            navigation.navigate("CreateBill", {
              invoiceNo: salesData.length + 1,
            })
          }
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
