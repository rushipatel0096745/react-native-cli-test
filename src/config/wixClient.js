// src/config/wixClient.js

import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = "6229f096-71b1-44b4-943c-e2f1b90934be"; 

export const wixClient = createClient({
  modules: { members },
  auth: OAuthStrategy({
    clientId: CLIENT_ID,
    tokens: async () => {
      const tokens = await AsyncStorage.getItem("wix_tokens");
      return tokens ? JSON.parse(tokens) : null;
    },
  }),
});

export const saveTokens = async (tokens) => {
  await AsyncStorage.setItem("wix_tokens", JSON.stringify(tokens));
};

export const clearTokens = async () => {
  await AsyncStorage.removeItem("wix_tokens");
};