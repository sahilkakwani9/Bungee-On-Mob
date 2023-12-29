import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/colors";
import formatTime from "../utils/helper/formatTime";
import { CrossChainRoute, SameChainRoute } from "../types/socket/route";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useConfigStore } from "../store/ConfigStore";

const RouteCard = ({
  item,
  isActive,
}: {
  item: CrossChainRoute | SameChainRoute;
  isActive: boolean;
}) => {
  const { setSelectedRoute } = useConfigStore();
  const getProtocolLogo = () => {
    if ("steps" in item.userTxs[0] && item.userTxs[0]?.steps) {
      const bridgeStep = item.userTxs[0]?.steps.filter((step) => {
        return step.type === "bridge";
      });
      return bridgeStep[0]?.protocol?.icon;
    } else if (
      "protocol" in item.userTxs[0] &&
      item.userTxs[0]?.protocol?.icon
    ) {
      return item.userTxs[0]?.protocol?.icon;
    }
  };

  const getProtocolName = () => {
    if ("usedBridgeNames" in item && item.usedBridgeNames) {
      return item.usedBridgeNames[0];
    } else if ("usedDexName" in item && item.usedDexName)
      return item.usedDexName;
  };

  const getReceivedAmount = () => {
    const receivedAmount =
      parseInt(item.toAmount) / 10 ** item.userTxs[0].toAsset.decimals;
    let decimals = 3; // Default number of decimals

    if (Math.abs(receivedAmount) >= 1000) {
      decimals = 0;
    } else if (Math.abs(receivedAmount) >= 1) {
      decimals = 2;
    }

    return `${receivedAmount.toFixed(decimals)} ${
      item.userTxs[0].toAsset.symbol
    }`;
  };

  const onPressRoute = () => {
    setSelectedRoute(item);
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive ? styles.activeBorder : styles.inactiveBorder,
      ]}
      onPress={onPressRoute}
    >
      <View style={styles.bridgeContainer}>
        <Image
          source={{
            uri: getProtocolLogo(),
          }}
          style={styles.bridgeIcon}
        />
        <View style={styles.bridgeTxtContainer}>
          <Text style={styles.bridgeName}>{getProtocolName()}</Text>
          <Text style={styles.bridgeTime}>
            {"serviceTime" in item ? formatTime(item?.serviceTime) : ""}
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
    </TouchableOpacity>
  );
};

export default RouteCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
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
  activeBorder: {
    borderColor: colors.border,
  },
  inactiveBorder: {
    borderColor: colors.foreground,
  },
});
