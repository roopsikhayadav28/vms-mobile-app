import {
  Image,
  ImageBackground,
  ImageLoadEventData,
  StyleSheet,
  View,
} from "react-native";
import Layout from "../../constants/Layout";
import Icon from "./Icon";
import { P1 } from "./StyledText";

type ImageViewProps = {
  variant:
    | "big_preview"
    | "small_preview"
    | "preview"
    | "card_preview"
    | "small_card_preview"
    | "extra_small_preview"
    | "thumb_nail_preview"
    | "Video";
  image_url: string;
  isVideo?: boolean;
};
export default function ImageView({
  variant,
  image_url,
  isVideo,
}: ImageViewProps) {
  function getStyles() {
    switch (variant) {
      case "big_preview":
        return styles.big_preview;
      case "small_preview":
        return styles.small_preview;
      case "preview":
        return styles.preview;
      case "extra_small_preview":
        return styles.extra_small_preview;
      case "card_preview":
        return styles.card_preview;
      case "small_card_preview":
        return styles.small_card_preview;
      case "thumb_nail_preview":
        return styles.thumb_nail_preview;
      case "Video":
        return styles.video;
      default:
        return {};
    }
  }
  if (isVideo) {
    return (
      <View style={styles.VideoView}>
        <ImageBackground style={getStyles()} source={{ uri: image_url }}>
          <Icon iconName="play-circle-fill" color="white" />
        </ImageBackground>
      </View>
    );
  } else return <Image style={getStyles()} source={{ uri: image_url }} />;
}

const styles = StyleSheet.create({
  big_preview: {
    height: Layout.window.height - Layout.baseSize * 21,
    width: "100%",
    // width:Layout.window.width
  },
  small_preview: {
    height: Layout.baseSize * 5,
    width: Layout.baseSize * 5,
    backgroundColor :'red',
    borderRadius: Layout.baseSize
  },
  preview: {
    height: Layout.baseSize * 8,
    width: Layout.baseSize * 8,
  },
  card_preview: {
    height: Layout.baseSize * 13,
    width: Layout.baseSize * 21,
  },
  small_card_preview: {
    height: Layout.baseSize * 5,
    width: Layout.baseSize * 8,
  },
  extra_small_preview: {
    height: Layout.baseSize * 4,
    width: Layout.window.width / 4.8,
    borderRadius: Layout.baseSize / 4,
  },
  thumb_nail_preview: {
    height: Layout.baseSize * 8,
    width: Layout.baseSize * 13,
    borderRadius: Layout.baseSize / 4,
  },
  video: {
    height: Layout.baseSize * 4,
    width: Layout.window.width / 4.8,
    // borderRadius:Layout.baseSize/4,
    // opacity:.3,
    alignItems: "center",
    justifyContent: "center",
  },
  VideoView: {
    height: Layout.baseSize * 4,
    width: Layout.window.width / 4.8,
    borderRadius: Layout.baseSize / 4,
    overflow: "hidden",
  },
});
