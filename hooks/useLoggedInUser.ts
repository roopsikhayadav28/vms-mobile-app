import { useMMKVObject } from "react-native-mmkv";
import { UserRef } from "../generated/hooks_and_more";

export default function useLoggedInUser(userToken?: string) {
  const [loggedInUser, setLoggedInUser] =
    useMMKVObject<UserRef>("user.storage");
  // log('logged in user in hook', loggedInUser)
  return { loggedInUser, setLoggedInUser };
}
