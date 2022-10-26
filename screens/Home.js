import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { FAB, Tab, Text, TabView } from "@rneui/themed";
import { useState } from "react";

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
          <Text h1>Transactions</Text>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <Text h1>Items</Text>
        </TabView.Item>
      </TabView>
      {/* <View style={styles.container}>
        <Image style={styles.tinyLogo} source={require("../assets/logo.png")} /> */}

      <FAB
        visible={visible}
        icon={{ name: "add", color: "white" }}
        color="#1e90ff"
        placement="right"
        title="New Bill"
        onPress={() => navigation.navigate("CreateBill")}
      />
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    opacity: 0.1,
  },
});

export default Home;
