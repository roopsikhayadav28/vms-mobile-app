import { Extras } from 'react-native/Libraries/Utilities/createPerformanceLogger';
import * as Sentry from 'sentry-expo';
import { UserRef } from '../generated/hooks_and_more';

export const initializeSentry = (dsn: string) => {
  Sentry.init({
    dsn: dsn,
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    autoSessionTracking: true,
    enableNative: true,
  })
};

export const captureSentryException = (message: string, error: Error) => {
  console.error(message, error);
  Sentry.React.captureException(error, {
    extra: {
      message,
    },
  });
};

export const captureMessage = (message: string, extraData?: Extras) => {
  Sentry.React.captureMessage(message, {
    extra: extraData,
  });
};

export const setUserContext = (userToken: string, loggedInUser: UserRef) => {
  Sentry.Native.setUser({
    id: userToken,
    username: !!loggedInUser?.name ? loggedInUser?.name : userToken,
    segment: `${loggedInUser?.name}:${userToken}`,
    email: loggedInUser?.email,
  })
};

export const setExtraContext = (extraData: { environment: string, version: string }) => {
  Sentry.React.setExtras(extraData);
};
