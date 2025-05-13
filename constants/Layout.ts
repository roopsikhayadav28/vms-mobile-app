import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const isSmallDevice = width < 375;
const dropX = 1;
const dropY = 1;
const drop = 1;
const baseSize = isSmallDevice ? 16 : 20;
export default {
  window: {
    width,
    height,
  },
  isSmallDevice,
  baseSize,
  dropX,
  dropY,
  drop,
  hitSlop: {
    icon: {
      left: baseSize,
      right: baseSize,
      top: baseSize,
      bottom: baseSize,
    },
  },
};
