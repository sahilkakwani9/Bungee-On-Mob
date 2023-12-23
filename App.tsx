import "@walletconnect/react-native-compat";
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
    <WagmiConfig config={wagmiConfig}>
      <SafeAreaProvider>
        <Navigation />
        <Web3Modal />
      </SafeAreaProvider>
    </WagmiConfig>
  );
}
