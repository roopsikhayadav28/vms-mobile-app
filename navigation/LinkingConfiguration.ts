/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "./navigationTypes";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      /* Root: {
        screens: {
          TabOne: {
            screens: {
              TaskScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              LeadScreen: "two",
            },
          },
        },
      }, 
      Modal: "modal", 
      NotFound: "*", */
    },
  },
};

export default linking;
