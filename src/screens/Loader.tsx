import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/colors";
import { useAccount } from "wagmi";
import { RootStackScreenProps } from "../types/navigation";
import getSupportedChains from "../utils/helper/getSupportedChains";
import { useConfigStore } from "../store/ConfigStore";
import { ChainInfo } from "../types/socket";
import getFromChainTokens from "../utils/helper/getFromChainTokens";
import getToChainTokens from "../utils/helper/getToChainTokens";
import { MOST_VALUED_TOKENS } from "../utils/constants";
import fetchTokenLists from "../utils/helper/fetchTokenLists";

const Loader = ({ navigation }: RootStackScreenProps<"Loader">) => {
  const { isConnected } = useAccount();
  const {
    setSupportedChains,
    setSendingChains,
    setReceivingChains,
    setSelectedReceivingChain,
    setSelectedSendingChain,
    setSendingTokens,
    setReceivingTokens,
    setSelectedSendingToken,
    setSelectedReceivingToken,
    setTokensLoading,
  } = useConfigStore();

  const checkLogin = async () => {
    const supportedChains = await getSupportedChains();
    setSupportedChains(supportedChains.result);
    const categorizedChains = supportedChains.result.reduce(
      (result, chainInfo) => {
        if (chainInfo.sendingEnabled) {
          result.sendingEnabledArray.push(chainInfo);
        }

        if (chainInfo.receivingEnabled) {
          result.receivingEnabledArray.push(chainInfo);
        }

        return result;
      },
      {
        sendingEnabledArray: [] as ChainInfo[],
        receivingEnabledArray: [] as ChainInfo[],
      }
    );

    setSendingChains(categorizedChains.sendingEnabledArray);
    setSelectedSendingChain(categorizedChains.sendingEnabledArray[0]);
    setReceivingChains(categorizedChains.receivingEnabledArray);
    setSelectedReceivingChain(categorizedChains.receivingEnabledArray[0]);
    await fetchTokenLists(
      categorizedChains.sendingEnabledArray[0].chainId,
      categorizedChains.receivingEnabledArray[0].chainId,
      {
        setTokensLoading,
        setSendingTokens,
        setReceivingTokens,
        setSelectedSendingToken,
        setSelectedReceivingToken,
      }
    );
    if (isConnected) {
      navigation.reset({ index: 0, routes: [{ name: "Root" }] });
      return;
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      return;
    }
  };

  React.useEffect(() => {
    checkLogin();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={colors.foreground} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
