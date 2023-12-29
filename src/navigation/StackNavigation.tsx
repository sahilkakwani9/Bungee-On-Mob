import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../types/navigation";
import BottomTabNavigator from "./BottomTabNavigation";
import Login from "../screens/Login";
import Loader from "../screens/Loader";
import Routes from "../screens/Routes";
import colors from "../utils/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
      }}
      initialRouteName={"Loader"}
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
      <Stack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Routes"
        component={Routes}
        options={{
          headerShown: true,
          animation: "default",
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: "Select route",
        }}
      />
    </Stack.Navigator>
  );
}
