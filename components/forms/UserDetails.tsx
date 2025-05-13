import { ScrollView, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Input } from "../basic/Input";
import PickerSelectButton from "../basic/PickerSelectButton";
import { View } from "../basic/Themed";
import { FormProps } from "./formTypes";
const { baseSize, window } = Layout;

type FormComponentProps = {} & FormProps;
//TODO: Figure out the specs for user details to be added for maybe customers interested in this lead?
const UserDetails = ({
  createLeadStatusEvent,
  currentStatus,
  desiredStatus,
  undesiredStatus,
  leadId,
  desiredButtonText,
  undesiredButtonText,
}: FormComponentProps): JSX.Element => {
  return (
    <View style={styles.container} key={leadId}>
      {/* TODO : Change key */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <PickerSelectButton
          placeholder={"Product Type"}
          onValueChange={() => {}}
          items={[
            { label: "a", value: "1" },
            { label: "b", value: "2" },
          ]}
        />
        <PickerSelectButton
          placeholder={"Purchase type"}
          onValueChange={() => {}}
          items={[
            { label: "a", value: "1" },
            { label: "b", value: "2" },
          ]}
        />
        <PickerSelectButton
          placeholder={"Name *"}
          onValueChange={() => {}}
          items={[
            { label: "a", value: "1" },
            { label: "b", value: "2" },
          ]}
        />
        <Input label="Mobile *" />
        <Input label={"Email *"} />
        <Input label="Address *" />
        <Input label={"Pincode"} />
        <PickerSelectButton
          placeholder={"State *"}
          onValueChange={() => {}}
          items={[
            { label: "a", value: "1" },
            { label: "b", value: "2" },
          ]}
        />
        <PickerSelectButton
          placeholder={"District *"}
          onValueChange={() => {}}
          items={[
            { label: "a", value: "1" },
            { label: "b", value: "2" },
          ]}
        />
      </ScrollView>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: baseSize,
  },
  pageStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
