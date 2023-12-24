import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Sheet from ".";
import { SvgFromUri } from "react-native-svg";
import { ChainInfo } from "../../types/socket";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useConfigStore } from "../../store/ConfigStore";

interface ISendingChainSheet {
  sheetRef: React.RefObject<BottomSheetMethods>;
  data: ChainInfo[];
}

const SendingChainSheet = ({ sheetRef, data }: ISendingChainSheet) => {
  const { setSelectedSendingChain } = useConfigStore();
  const selectChain = (chain: ChainInfo) => {
    setSelectedSendingChain(chain);
  };
  const renderItem = ({ item }: { item: ChainInfo }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          selectChain(item);
          sheetRef.current?.close();
        }}
      >
        <View style={styles.switchImage}>
          {item.icon.includes(".svg") ? (
            <SvgFromUri
              uri={
                item.icon ? item.icon : "https://media.socket.tech/Matic.svg"
              }
              width={"100%"}
              height={"100%"}
              style={{
                borderRadius: 20,
              }}
            />
          ) : (
            <Image
              source={{ uri: item.icon }}
              style={{
                borderRadius: 20,
                height: "100%",
                width: "100%",
              }}
            />
          )}
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Sheet ref={sheetRef} enablePanDownToClose={true} snapPoints={["50%"]}>
      <BottomSheetFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.chainId.toString()}
      />
    </Sheet>
  );
};

export default SendingChainSheet;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },
  text: {
    fontSize: 16,
  },
  switchImage: {
    height: 40,
    width: 40,
    overflow: "hidden",
    borderRadius: 100,
  },
});
