import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAccount } from "wagmi";
import colors from "../utils/colors";
import { useConfigStore } from "../store/ConfigStore";
import { SvgFromUri } from "react-native-svg";
import DropDown from "../assets/icons/Dropdown-Filled";

const Bridge = () => {
  const { address } = useAccount();
  const { receivingChains, sendingChains } = useConfigStore();

  return (
    <View style={styles.container}>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.switchContainer}>
        <View style={styles.switch}>
          <View style={styles.switchImage}>
            <SvgFromUri
              uri={sendingChains![0].icon}
              width={"100%"}
              height={"100%"}
              style={{
                backgroundColor: "green",
                borderRadius: 20,
              }}
            />
          </View>
          <View style={styles.dropDownContainer}>
            <Text style={styles.switchText}>{sendingChains![0].name}</Text>
            <DropDown
              height={25}
              width={25}
              color={colors.background}
              style={{
                marginTop: 4,
              }}
            />
          </View>
        </View>
        <View style={styles.switch}>
          <View style={styles.switchImage}>
            <SvgFromUri
              uri={receivingChains![0].icon}
              width={"100%"}
              height={"100%"}
              style={{
                backgroundColor: "green",
                borderRadius: 20,
              }}
            />
          </View>
          <View style={styles.dropDownContainer}>
            <Text style={styles.switchText}>{receivingChains![0].name}</Text>
            <DropDown
              height={25}
              width={25}
              color={colors.background}
              style={{
                marginTop: 4,
              }}
            />
          </View>
        </View>
      </View>
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
});
