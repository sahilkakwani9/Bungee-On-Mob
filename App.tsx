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

const projectId = "12f5e16f041d6590f7e885d0af4875cf";

// 2. Create config
const metadata = {
  name: "MoBungee",
  description: "Bungee on your phone",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
createWeb3Modal({
  projectId,
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
