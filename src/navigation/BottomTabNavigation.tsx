import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types/navigation/index";
import React from "react";
import CustomTabBar from "../components/BottomBar";
import BridgeIcon from "../assets/icons/BridgeIcon";
import Bridge from "../screens/Bridge";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <BottomTab.Screen
        name="Wallet"
        component={Bridge}
        options={{
          tabBarLabel: "Wallet",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <BridgeIcon height={24} width={24} color={color} />
          ), // Specify the icon for this taba
        }}
      />
    </BottomTab.Navigator>
  );
}
