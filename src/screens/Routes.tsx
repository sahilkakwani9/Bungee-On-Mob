import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import RouteCard from "../components/RouteCard";
import { RootStackScreenProps } from "../types/navigation";
import { CrossChainRoute, SameChainRoute } from "../types/socket/route";
import { useConfigStore } from "../store/ConfigStore";

const Routes = ({ navigation, route }: RootStackScreenProps<"Routes">) => {
  const { routes } = route.params;
  const { selectedRoute } = useConfigStore();
  const renderItem = ({ item }: { item: CrossChainRoute | SameChainRoute }) => {
    return <RouteCard item={item} isActive={item === selectedRoute} />;
  };

  return (
    <FlatList
      data={routes?.result?.routes}
      keyExtractor={(item) => item.routeId.toString()}
      renderItem={renderItem}
      style={styles.routesContainer}
      contentContainerStyle={styles.routesContentContainer}
    />
  );
};

export default Routes;

const styles = StyleSheet.create({
  routesContainer: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  routesContentContainer: {
    flexDirection: "column",
    gap: 10,
  },
});
