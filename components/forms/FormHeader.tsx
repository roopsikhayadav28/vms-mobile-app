import * as React from "react";
import { StyleSheet, TouchableOpacityProps } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { View } from "../basic/Themed";
import { FormProps } from "./formTypes";
const { baseSize, window } = Layout;
const forward = ">";
const backward = "<";

type FormHeaderProps = TouchableOpacityProps & {
  onPressNext: () => void;
  onPressPrev: () => void;
  title: string;
  active: number;
  noOfPages: {
    id: number;
  }[];
};
type FormComponentProps = {} & FormProps;
const FormHeader = ({
  createLeadStatusEvent,
  currentStatus,
  desiredStatus,
  undesiredStatus,
  leadId,
  desiredButtonText,
  undesiredButtonText,
  navigation,
}: FormComponentProps): JSX.Element => {
  return (
    <View style={styles.container}>
      {/* {props.active != 0 && (
        <TouchableOpacity
          onPress={() => props.onPressPrev()}
          style={{ backgroundColor: Colors.light.inputBg, paddingLeft: 10 }}
        >
          <H1>{backward}</H1>
        </TouchableOpacity>
      )} */}
      <View style={styles.containerInner}>
        {/* <H3>{props.title}</H3> */}
        <View style={styles.pageIndecatorView}>
          {/* //{props.noOfPages.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.indecatorStyle,
                  //{ width: props.active === item.id ? 12 : 5 },
                ]}
              ></View>
            );
          })} */}
        </View>
      </View>
      {/* { //props.active != 4 && (
        <TouchableOpacity
          onPress={() => void}
          style={{ backgroundColor: Colors.light.inputBg, paddingRight: 10 }}
        >
          <H1>{forward}</H1>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: baseSize / 3,
    backgroundColor: Colors.light.inputBg,
  },
  containerInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.inputBg,
  },
  pageIndecatorView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 8,
    backgroundColor: Colors.light.inputBg,
  },
  indecatorStyle: {
    height: 5,
    borderRadius: 5 / 2,
    backgroundColor: "gray",
    marginRight: 5,
  },
});
