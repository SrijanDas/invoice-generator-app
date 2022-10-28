// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, CreateBill, AddItems, NewItem } from "./screens";
import { Button, Icon } from "@rneui/themed";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
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
          name="Add Items"
          component={AddItems}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("NewItem")}
                buttonStyle={{ borderRadius: 20 }}
                color="#dc143c"
              >
                <Icon
                  name="pluscircle"
                  type="ant-design"
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
                Add New Item
              </Button>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
