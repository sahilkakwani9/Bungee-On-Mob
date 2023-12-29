import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/colors";
import formatTime from "../utils/helper/formatTime";
import { Route, Step } from "../types/socket/route";

const RouteCard = ({ item }: { item: Route }) => {
  const getBridgeLogo = () => {
    const bridgeStep = item.userTxs[0].steps?.filter((step) => {
      return step.type == "bridge";
    });
    return bridgeStep[0]?.protocol?.icon;
  };

  const getReceivedAmount = () => {
    const receivedAmount =
      parseInt(item.toAmount) / 10 ** item.userTxs[0].toAsset.decimals;
    return `${receivedAmount.toFixed(3)} ${item.userTxs[0].toAsset.symbol}`;
  };
  return (
    <View style={styles.container}>
      <View style={styles.bridgeContainer}>
        <Image
          source={{
            uri: getBridgeLogo(),
          }}
          style={styles.bridgeIcon}
        />
        <View style={styles.bridgeTxtContainer}>
          <Text style={styles.bridgeName}>{item.usedBridgeNames[0]}</Text>
          <Text style={styles.bridgeTime}>
            {formatTime(item.maxServiceTime)}
          </Text>
        </View>
      </View>
      <View style={styles.outputContainer}>
        <View style={styles.seperator}>
          <Text style={styles.constant}>Est. Output</Text>
          <Text style={styles.output}>{getReceivedAmount()}</Text>
        </View>
        <View style={styles.seperator}>
          <Text style={styles.constant}>Gas fees</Text>
          <Text style={styles.output}>{`$${item.totalGasFeesInUsd.toFixed(
            2
          )}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default RouteCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.border,
    padding: 8,
    flexDirection: "column",
    gap: 4,
    borderRadius: 4,
    // flex: 1,
    // padding: 16,
  },
  bridgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bridgeIcon: {
    height: 26,
    width: 26,
    borderRadius: 4,
  },
  bridgeTxtContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bridgeName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.foreground,
  },
  bridgeTime: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.foreground,
    opacity: 0.7,
  },
  outputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 8,
  },
  seperator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  constant: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.foreground,
    opacity: 0.7,
  },
  output: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
  },
  gasFees: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.foreground,
  },
});
