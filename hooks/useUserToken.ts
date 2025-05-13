import { useMMKVString } from "react-native-mmkv";
import { MMKV_STORAGE } from "../utils/graphqlClient";

export default function useUserToken() {
  const [userToken, setUserToken] = useMMKVString(
    "user-token.storage",
    MMKV_STORAGE
  );

  return { userToken, setUserToken };
}
