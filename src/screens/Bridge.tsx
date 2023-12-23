import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAccount } from "wagmi";
import colors from "../utils/colors";

const Bridge = () => {
  const { address } = useAccount();
  return (
    <View>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
};

export default Bridge;

const styles = StyleSheet.create({
  address: {
    color: colors.foreground,
  },
});
