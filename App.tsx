import "@walletconnect/react-native-compat";
import "react-native-gesture-handler";
import React from "react";

// import MainScreen from './screens/MainScreen';
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, arbitrum } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import { PROJECT_ID } from "./src/utils/secret";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { PortalProvider } from "@gorhom/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// 2. Create config
const metadata = {
  name: "MoBungee",
  description: "Bungee on your phone",
  url: "https://www.bungee.exchange/",
  icons: ["https://www.bungee.exchange/"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: PROJECT_ID,
  metadata,
});
createWeb3Modal({
  projectId: PROJECT_ID,
  chains,
  wagmiConfig,
});

export default function App() {
  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <GestureHandlerRootView style={styles.container}>
        <WagmiConfig config={wagmiConfig}>
          <PortalProvider>
            <SafeAreaProvider>
              <StatusBar barStyle={"light-content"} />
              <Navigation />
            </SafeAreaProvider>
            <Web3Modal />
          </PortalProvider>
        </WagmiConfig>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
