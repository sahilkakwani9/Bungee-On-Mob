import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import colors from "../utils/colors";
import { useConfigStore } from "../store/ConfigStore";
import { SvgFromUri } from "react-native-svg";
import DropDown from "../assets/icons/Dropdown-Filled";
import SendingChainSheet from "../components/sheets/SendingChainSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ReceivingChainSheet from "../components/sheets/ReceivingChainSheet";
import SendingTokenSheet from "../components/sheets/SendingTokenSheet";
import ReceivingTokenSheet from "../components/sheets/ReceivingTokenSheet";
import fetchTokenLists from "../utils/helper/fetchTokenLists";
import getRoutes from "../utils/helper/getRoutes";
import { sortCriteria } from "../types/socket";
import RouteCard from "../components/RouteCard";
import { RootTabScreenProps } from "../types/navigation";

const Bridge = ({ navigation }: RootTabScreenProps<"Bridge">) => {
  const { address } = useAccount();
  const {
    receivingChains,
    sendingChains,
    sendingTokens,
    receivingTokens,
    selectedSendingChain,
    selectedReceivingChain,
    selectedReceivingToken,
    selectedSendingToken,
    tokensLoading,
    setTokensLoading,
    setSendingTokens,
    setReceivingTokens,
    setSelectedSendingToken,
    setSelectedReceivingToken,
  } = useConfigStore();
  const sendChainSheetRef = React.useRef<BottomSheetMethods>(null);
  const receivingChainSheetRef = React.useRef<BottomSheetMethods>(null);
  const sendTokenSheetRef = React.useRef<BottomSheetMethods>(null);
  const receiveTokenSheetRef = React.useRef<BottomSheetMethods>(null);
  const [routesLoading, setRoutesLoading] = React.useState(false);
  const openSendingSheet = () => {
    sendChainSheetRef.current?.snapToIndex(0);
  };
  const openReceivingSheet = () => {
    receivingChainSheetRef.current?.snapToIndex(0);
  };
  const openSendTokenSheet = () => {
    sendTokenSheetRef.current?.snapToIndex(0);
  };
  const openReceiveTokenSheet = () => {
    receiveTokenSheetRef.current?.snapToIndex(0);
  };

  const onPressRoutes = async () => {
    try {
      setRoutesLoading(true);
      const routes = await getRoutes(
        selectedSendingChain?.chainId!,
        selectedSendingToken?.address!,
        selectedReceivingChain?.chainId!,
        selectedReceivingToken?.address!,
        "1000000000000000000",
        address!,
        sortCriteria.OUTPUT
      );
      setRoutesLoading(false);
      navigation.navigate("Routes", { routes });
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchTokenLists(
      selectedSendingChain?.chainId!,
      selectedReceivingChain?.chainId!,
      {
        setTokensLoading,
        setSendingTokens,
        setReceivingTokens,
        setSelectedSendingToken,
        setSelectedReceivingToken,
      }
    );
  }, [selectedSendingChain, selectedReceivingChain]);

  return (
    <View style={styles.container}>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.switchContainer}>
        <View style={styles.midContainer}>
          <View style={styles.switch}>
            <View style={styles.switchImage}>
              {selectedSendingChain!.icon.includes(".svg") ? (
                <SvgFromUri
                  uri={
                    selectedSendingChain!.icon
                      ? selectedSendingChain!.icon
                      : "https://media.socket.tech/Matic.svg"
                  }
                  width={"100%"}
                  height={"100%"}
                  style={{
                    borderRadius: 20,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: selectedSendingChain!.icon }}
                  style={{
                    borderRadius: 20,
                    height: "90%",
                    width: "90%",
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.dropDownContainer}
              onPress={openSendingSheet}
            >
              <Text style={styles.switchText}>
                {selectedSendingChain!.name}
              </Text>
              <DropDown
                height={25}
                width={25}
                color={colors.background}
                style={{
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          {tokensLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <TouchableOpacity
              onPress={openSendTokenSheet}
              style={styles.tokenContainer}
            >
              <View style={styles.switchImage}>
                {selectedSendingToken!.logoURI!.includes(".svg") ? (
                  <SvgFromUri
                    uri={
                      selectedSendingToken!.logoURI!
                        ? selectedSendingToken!.logoURI!
                        : "https://media.socket.tech/Matic.svg"
                    }
                    width={"100%"}
                    height={"100%"}
                    style={{
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: selectedSendingToken!.logoURI! }}
                    style={{
                      borderRadius: 20,
                      height: "90%",
                      width: "90%",
                    }}
                  />
                )}
              </View>
              <DropDown
                height={22}
                width={22}
                color={colors.foreground}
                style={{
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.midContainer}>
          <View style={styles.switch}>
            <View style={styles.switchImage}>
              {selectedReceivingChain!.icon.includes(".svg") ? (
                <SvgFromUri
                  uri={
                    selectedReceivingChain!.icon
                      ? selectedReceivingChain!.icon
                      : "https://media.socket.tech/Matic.svg"
                  }
                  width={"100%"}
                  height={"100%"}
                  style={{
                    borderRadius: 20,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: selectedReceivingChain!.icon }}
                  style={{
                    borderRadius: 20,
                    height: "90%",
                    width: "90%",
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.dropDownContainer}
              onPress={openReceivingSheet}
            >
              <Text style={styles.switchText}>
                {selectedReceivingChain!.name}
              </Text>
              <DropDown
                height={25}
                width={25}
                color={colors.background}
                style={{
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          {tokensLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <TouchableOpacity
              onPress={openReceiveTokenSheet}
              style={styles.tokenContainer}
            >
              <View style={styles.switchImage}>
                {selectedReceivingToken!.logoURI!.includes(".svg") ? (
                  <SvgFromUri
                    uri={
                      selectedReceivingToken!.logoURI!
                        ? selectedReceivingToken!.logoURI!
                        : "https://media.socket.tech/Matic.svg"
                    }
                    width={"100%"}
                    height={"100%"}
                    style={{
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: selectedReceivingToken!.logoURI! }}
                    style={{
                      borderRadius: 20,
                      height: "90%",
                      width: "90%",
                    }}
                  />
                )}
              </View>
              <DropDown
                height={22}
                width={22}
                color={colors.foreground}
                style={{
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.routesButton} onPress={onPressRoutes}>
            {routesLoading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <Text style={styles.btnText}>Show Routes</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <SendingChainSheet data={sendingChains!} sheetRef={sendChainSheetRef} />
      <ReceivingChainSheet
        data={receivingChains!}
        sheetRef={receivingChainSheetRef}
      />
      <SendingTokenSheet data={sendingTokens!} sheetRef={sendTokenSheetRef} />
      <ReceivingTokenSheet
        data={receivingTokens!}
        sheetRef={receiveTokenSheetRef}
      />
    </View>
  );
};

export default Bridge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  address: {
    color: colors.foreground,
  },
  switchContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  switch: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.foreground,
  },
  switchImage: {
    height: 50,
    width: 50,
    overflow: "hidden",
    borderRadius: 100,
  },
  switchText: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.background,
  },
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  midContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  tokenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  btnContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    height: 150,
    width: "100%",
  },
  routesButton: {
    backgroundColor: colors.pink,
    width: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  btnText: {
    color: colors.background,
    fontSize: 28,
    fontWeight: "700",
  },
});
