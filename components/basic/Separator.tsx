import { StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
type SeparatorProps = {
  size?: number;
  bgColor?: boolean;
};
export default function Separator({ size = 0.5, bgColor }: SeparatorProps) {
  const styles = getStyles(size);
  return <View style={styles.container} />;
}

const getStyles = (size: number) =>
  StyleSheet.create({
    container: {
      width: Layout.window.width,
      height: Layout.baseSize * size,
    },
  });
