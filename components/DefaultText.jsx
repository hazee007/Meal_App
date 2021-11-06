import React from "react";
import { Text, StyleSheet } from "react-native";

export default function ({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 15,
  },
});
