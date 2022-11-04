// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import {
  Home,
  CreateBill,
  AddItems,
  NewItem,
  ItemDetails,
  Preview,
  BillDetails,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "RR Enterprise",
            headerLeft: () => (
              <TouchableOpacity>
                <Icon name="menu" type="Feather" style={{ marginRight: 6 }} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="CreateBill"
          component={CreateBill}
          options={{ headerTitle: "Create Bill" }}
        />
        <Stack.Screen
          name="NewItem"
          component={NewItem}
          options={{ headerTitle: "Add New Item" }}
        />
        <Stack.Screen
          name="AddItems"
          component={AddItems}
          options={{
            headerTitle: "Add Items",
          }}
          // ({ navigation, route }) => ({
          // headerRight: () => (
          //   <Button
          //     onPress={() => navigation.navigate("NewItem")}
          //     buttonStyle={{ borderRadius: 20 }}
          //     color="#dc143c"
          //   >
          //     <Icon
          //       name="pluscircle"
          //       type="ant-design"
          //       size={20}
          //       color="white"
          //       style={{ marginRight: 10 }}
          //     />
          //     Add New Item
          //   </Button>
          // ),
          // })}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={{
            headerTitle: "Item Details",
          }}
        />
        <Stack.Screen name="Preview" component={Preview} options={{}} />
        <Stack.Screen
          name="BillDetails"
          component={BillDetails}
          options={{
            headerTitle: "Bill Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
