import { AuthErrorCodes } from "firebase/auth";
import { AlertsHelper } from "./alertsHelper";

export function firebaseAuthHelper(errorCode: any) {
  if (errorCode.message.includes(AuthErrorCodes.INVALID_CODE)) {
    AlertsHelper.error("Invalid OTP, please check the OTP code again!");
  } else if (errorCode.message.includes(AuthErrorCodes.CODE_EXPIRED)) {
    AlertsHelper.error("Code expired!");
  } else if (errorCode.message.includes(AuthErrorCodes.INVALID_PHONE_NUMBER)) {
    AlertsHelper.error("Enter a valid phone number");
  } else if (errorCode.message.includes(AuthErrorCodes.MISSING_CODE)) {
    AlertsHelper.error("OTP cannot be blank!");
  } else if (
    errorCode.message.includes(AuthErrorCodes.INTERNAL_ERROR) ||
    errorCode.message.includes(AuthErrorCodes.NETWORK_REQUEST_FAILED)
  ) {
    AlertsHelper.error(
      "Uh-oh, looks like the server is acting up. Should be up soon!"
    );
  } else if (errorCode.message.includes(AuthErrorCodes.TIMEOUT)) {
    AlertsHelper.error("Request timeout, Please try again later");
  } else if (errorCode.message.includes(AuthErrorCodes.CAPTCHA_CHECK_FAILED)) {
    AlertsHelper.error("Captcha check failed, Please try again");
  } else if (errorCode.message.includes(AuthErrorCodes.USER_CANCELLED)) {
    AlertsHelper.error("Captcha check cancelled by the user");
  } else if (
    errorCode.message.includes(AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER)
  ) {
    AlertsHelper.error(
      "Too many request attempted, Please try again after 4Hours!"
    );
  } else {
    AlertsHelper.error(errorCode.message);
  }
}
