import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import dateFormat, { masks } from "dateformat";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { PdfCode } from "../components/PdfCode";
import * as React from "react";
import { Button, Icon, Input } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateBill = ({ navigation }) => {
  const [name, set_Name] = useState("");
  const [Address, Set_Address] = useState("");
  const [Mobile_No, Set_Mobile_No] = useState("");
  const [Quantity, setQuantity] = useState("");
  const now = new Date();
  const [Invoice, setInvoice] = useState(dateFormat(now, "ddmmyyhhMss"));
  const [Product, Set_Product] = useState("");
  const [Total, setTotal] = useState("");
  const [ReceivedBalance, SetReceivedBalance] = useState("");
  const [PaymentType, setPaymentType] = useState("Cash");
  const [RemaningBalance, setRemaningBalance] = useState("Paid");
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    let html = PdfCode(
      name,
      Address,
      Mobile_No,
      Quantity,
      Invoice,
      Product,
      Total,
      ReceivedBalance,
      PaymentType,
      RemaningBalance
    );
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      const { uri } = await Print.printToFileAsync({
        html,
      });
      console.log("File has been saved to:", uri);
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

      set_Name("");
      setInvoice(dateFormat(now, "ddmmyyhhMss"));
      setTotal("");
      setQuantity("");
      SetReceivedBalance("");
      Set_Address("");
      Set_Mobile_No("");
    } catch (err) {
      Alert.alert("Make shure You have Internet Connection");
    }
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  // date picker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBtnContainer}>
          <TouchableOpacity style={styles.topBtn}>
            <Text style={{ color: "#808080" }}>Invoice No.</Text>
            <Text style={{ fontSize: 15 }}>1 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.topBtn}
          >
            <Text style={{ color: "#808080" }}>Date</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                {date.getDate() +
                  "/" +
                  date.getMonth() +
                  "/" +
                  date.getFullYear()}
              </Text>
              <Icon
                style={{ marginLeft: 2 }}
                name="down"
                type="antdesign"
                color="#808080"
                size={14}
              />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {/* <OutlinedTextField label="Phone number" keyboardType="phone-pad" /> */}
          <View style={styles.InputContainer}>
            <Text>Name :</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => set_Name(text)}
              value={name}
              placeholder="Full Name"
              autoFocus
            />
          </View>

          <View style={styles.InputContainer}>
            <Text>Mobile No : </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={(text) => Set_Mobile_No(text)}
              value={Mobile_No}
              placeholder="Mobile No"
            />
          </View>
          <View style={styles.InputContainer}>
            <Button
              buttonStyle={{ borderRadius: 3 }}
              type="outline"
              title="Add Item"
              onPress={() => navigation.navigate("Add Items")}
            >
              <Icon
                name="pluscircle"
                type="ant-design"
                size={20}
                color="#1e90ff"
                style={{ marginRight: 5 }}
              />
              Add Items
            </Button>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Total Amount
            </Text>
            <Input
              leftIcon={{ type: "font-awesome", name: "rupee", size: 18 }}
              placeholder=""
              containerStyle={{ width: 150 }}
              keyboardType="number-pad"
            />
          </View>
        </ScrollView>
      </View>
      <Button onPress={printToFile} buttonStyle={{ height: 60 }}>
        Create Bill
      </Button>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

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
  tinyLogo: {
    width: 70,
    height: 70,
  },
  button: {
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 4,
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
  PickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
  },
  CreateInvoiceButton: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
});

export default CreateBill;
