import { fetchUserInfoAsync, revokeAsync } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { log } from "./helpers";

const issuer = "https://accounts.google.com";
const discovery = Google.discovery;

export async function fetchUserInfo(accessToken: string) {
  try {
    const { userInfoEndpoint } = discovery;
    const response = await fetchUserInfoAsync(
      { accessToken },
      { userInfoEndpoint }
    );
    log("response from user info", response);
    return response;
  } catch (error) {
    if (error) log("error fetching discovery", error);
  }
}

/* export function getFreshTokens(refreshToken: string) {
  await refreshAsync({clientId, refreshToken}, discovery)
} */

export async function revokeAccess(token: string) {
  // Revoke access of a user under the following conditions
  // Log in constraints from only one device at a time
  // In case an employee has left the organization
  await revokeAsync({ token }, discovery);
}
