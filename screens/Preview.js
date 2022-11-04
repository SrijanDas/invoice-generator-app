import { Alert, View } from "react-native";
import React, { useState } from "react";
// import PDFReader from "rn-pdf-reader-js";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { PdfCode } from "../components/PdfCode";
import { WebView } from "react-native-webview";
import { FAB, Icon } from "@rneui/themed";
import COLORS from "../constants/COLORS";
import { StatusBar } from "expo-status-bar";

const Preview = ({ navigation, route }) => {
  const [selectedPrinter, setSelectedPrinter] = useState();

  const { salesData, newBill, hideDoneBtn } = route.params;
  const html = PdfCode(newBill);

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // let html = PdfCode(newBill);
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      const { uri } = await Print.printToFileAsync({
        html: html,
      });

      console.log("File has been saved to:", uri);

      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (err) {
      Alert.alert("Make shure You have Internet Connection");
    }
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <>
      <StatusBar style="auto" />
      <WebView
        style={{ marginBottom: 20, marginTop: 10 }}
        originWhitelist={["*"]}
        source={{ html: html }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
      />
      <View
        style={{
          // backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
          backfaceVisibility: "visible",
          marginBottom: 15,
        }}
      >
        {!hideDoneBtn && (
          <FAB
            visible={true}
            title="Done"
            icon={{ name: "check", color: "white", type: "antdesign" }}
            color={COLORS.blue}
            onPress={() =>
              navigation.navigate({
                name: "Home",
                params: { salesData: salesData },
                merge: true,
              })
            }
          />
        )}
        <FAB
          visible={true}
          title="Share"
          icon={{ name: "share", color: "white", type: "font-awsome" }}
          color="#ffd700"
          onPress={printToFile}
        />
      </View>
    </>
  );
};

export default Preview;
