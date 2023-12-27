import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../utils/colors";

const RouteCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bridgeContainer}>
        <Image
          source={{
            uri: "https://bridgelogos.s3.ap-south-1.amazonaws.com/hop.png",
          }}
          style={styles.bridgeIcon}
        />
        <Text style={styles.bridgeName}>Across</Text>
        <Text style={styles.bridgeTime}>~ 1 min</Text>
      </View>
      <View style={styles.outputContainer}>
        <View style={styles.seperator}>
          <Text style={styles.constant}>Est. Output</Text>
          <Text style={styles.output}>9.961 USDC</Text>
        </View>
        <View style={styles.seperator}>
          <Text style={styles.constant}>Gas fees</Text>
          <Text style={styles.output}>$6.07</Text>
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
    gap: 8,
  },
  bridgeIcon: {
    height: 26,
    width: 26,
    borderRadius: 4,
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
    fontSize: 18,
    fontWeight: "500",
    color: colors.foreground,
    opacity: 0.7,
  },
  output: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.foreground,
  },
  gasFees: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.foreground,
  },
});
