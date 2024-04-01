import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewComponent() {
  return (
    <WebView
      style={styles.webview}
      originWhitelist={["*"]}
      source={{ uri: "https://billboardsjcetapp.netlify.app/" }}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn("WebView error: ", nativeEvent);
      }}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    // flex: 1,
    // height: "90%",
    // width: "90%",
    // aspectRatio: 9 / 16,
  },
});
