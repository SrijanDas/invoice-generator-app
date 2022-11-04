import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Icon, Input } from "@rneui/themed";
import { ProductContainer } from "../components";
import dateFormat from "dateformat";
import COLORS from "../constants/COLORS";

const BillDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sale } = route.params;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBtnContainer}>
          <View style={styles.topBtn}>
            <Text style={{ color: "#808080" }}>Invoice No.</Text>
            <Text style={{ fontSize: 15 }}>{sale.invoice}</Text>
          </View>
          <View style={styles.topBtn}>
            <Text style={{ color: "#808080" }}>Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                {dateFormat(sale.date, "dd/mm/yyyy")}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView>
          {/* <OutlinedTextField label="Phone number" keyboardType="phone-pad" /> */}
          <View style={styles.InputContainer}>
            <Text>Name* :</Text>
            <TextInput
              style={styles.textInput}
              //   onChangeText={(text) => set_Name(text)}
              value={sale.name}
              //   placeholder="Full Name"
              editable={false}
            />
          </View>

          {/* <View style={styles.InputContainer}>
            <Text>Mobile No : </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={(text) => Set_Mobile_No(text)}
              value={Mobile_No}
              placeholder="Mobile No"
            />
          </View> */}
          {sale.products.length ? (
            <View style={{ padding: 15 }}>
              <View
                style={{
                  backgroundColor: COLORS.lightblue,
                  flexDirection: "row",
                  borderRadius: 6,
                  padding: 8,
                }}
              >
                <Icon
                  name="arrow-drop-down-circle"
                  type="materialicons"
                  color="white"
                  size={16}
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "white" }}>Billed Items</Text>
              </View>

              {sale.products.map((p, i) => (
                <ProductContainer key={i} product={p} index={i} />
              ))}
            </View>
          ) : null}

          <View style={styles.bottomRow}>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Total Amount*
            </Text>
            <Input
              leftIcon={{ type: "font-awesome", name: "rupee", size: 18 }}
              containerStyle={{ width: 150 }}
              value={sale.total.toString()}
              disabled
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomBtnContainer}>
        <Button
          type="outline"
          color="white"
          titleStyle={{ color: "black" }}
          buttonStyle={{ height: "100%" }}
          containerStyle={{ width: "50%", height: 60 }}
          onPress={() => {
            console.log("edit");
          }}
        >
          <Icon style={{ marginRight: 5 }} name="edit" type="MaterialIcons" />
          Edit
        </Button>

        <Button
          buttonStyle={{ height: "100%" }}
          color={COLORS.blue}
          containerStyle={{ width: "50%" }}
          onPress={() => {
            navigation.navigate({
              name: "Preview",
              params: { newBill: sale, hideDoneBtn: true },
              // merge: true,
            });
          }}
        >
          <Icon
            style={{ marginRight: 5 }}
            color="white"
            name="eyeo"
            type="ant-design"
          />
          Preview
        </Button>
      </View>
    </>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  topBtnContainer: {
    flexDirection: "row",
  },
  topBtn: {
    borderRadius: 3,
    height: 60,
    width: "50%",
    marginVertical: 10,
    borderColor: "rgba(244, 244, 244, 1)",
    borderRightWidth: 2,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  InputContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    // width:100,
    marginTop: 4,
    height: 40,
    borderColor: "#a9a9a9",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    marginBottom: 6,
    paddingLeft: 8,
  },

  bottomRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: COLORS.lightgrey,
    borderRadius: 5,
  },

  bottomBtnContainer: {
    height: 60,
    flexDirection: "row",
  },
});
