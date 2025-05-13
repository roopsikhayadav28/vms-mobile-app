import { useCallback } from "react";
import { client, persistor } from "../utils/graphqlClient";
import useLoggedInUser from "./useLoggedInUser";
import useUserToken from "./useUserToken";

export default function useLogout() {
  const { setUserToken, userToken } = useUserToken();
  const { setLoggedInUser } = useLoggedInUser(userToken);
  client.onResetStore(async () => {
    setLoggedInUser(undefined);
    setUserToken(undefined);
  });
  const logout = useCallback(function logout() {
    //TODO: Clear persistor storage cache
    persistor.pause();
    persistor.purge();
    //TODO: Clear InMemory Store cache
    client.resetStore();
  }, []);
  return logout;
}
