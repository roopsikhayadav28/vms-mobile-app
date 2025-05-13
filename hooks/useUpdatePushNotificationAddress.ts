import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useUpdatePushNotificationAddressMutation } from "../generated/hooks_and_more";
import { log } from "../utils/helpers";
import useLoggedInUser from "./useLoggedInUser";
import useUserToken from "./useUserToken";

export default function useUpdatePushNotificationAddress() {
  const { userToken } = useUserToken();
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(userToken);

  const [updatePushNotificationAddress] =
    useUpdatePushNotificationAddressMutation({
      onCompleted: ({ updateUser }) => {
        log("user pns address updated with", updateUser?.user);
        if (updateUser && updateUser.user && updateUser.user.length > 0) {
          setLoggedInUser(updateUser?.user[0]);
        }
      },
    });
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        //TODO: Take the user to respective settings app to allow notifications manually
        alert("Please allow to get notified on important tasks");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      // check if loggedInUser.expoPushNotificationAddress exists and is equal to current address
      if (loggedInUser?.expoPushNotificationAddress !== token) {
        updatePushNotificationAddress({
          variables: {
            userId: userToken as string,
            address: token,
          },
        });
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
}
