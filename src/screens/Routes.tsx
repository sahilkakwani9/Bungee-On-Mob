import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import RouteCard from "../components/RouteCard";
import { RootStackScreenProps } from "../types/navigation";
import { Route } from "../types/socket/route";

const Routes = ({ navigation, route }: RootStackScreenProps<"Routes">) => {
  const { routes } = route.params;
  const renderItem = ({ item }: { item: Route }) => {
    return <RouteCard item={item} />;
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
