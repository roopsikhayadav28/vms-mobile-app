import React from "react";
import { StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { P1 } from "./StyledText";

type ListEmptyComponentProps = {
  text: string;
};
export default function ListEmptyComponent({ text }: ListEmptyComponentProps) {
  return (
    <View style={styles.container}>
      <P1>{text}</P1>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: Layout.baseSize * 8,
  },
});
