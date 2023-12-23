import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../utils/colors";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount } from "wagmi";
import { RootStackScreenProps } from "../types/navigation";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const { open, close } = useWeb3Modal();
  const { isConnected } = useAccount();
  React.useEffect(() => {
    if (isConnected) {
      navigation.reset({ index: 0, routes: [{ name: "Root" }] });
    }
  }, [isConnected]);

  const onPressConnect = () => {
    open();
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/bungee-logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.titleText}>on Mobile</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.connectButton} onPress={onPressConnect}>
          <Text style={styles.btnText}>Connect Wallet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: 100,
    width: 200,
  },
  logo: {
    flex: 1,
    objectFit: "contain",
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontSize: 30,
    color: colors.foreground,
    fontWeight: "800",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  connectButton: {
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
