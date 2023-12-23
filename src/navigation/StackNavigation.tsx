import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../types/navigation";
import BottomTabNavigator from "./BottomTabNavigation";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
      }}
      initialRouteName={"Login"}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
