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
import { TokenInfo } from "../../types/socket";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useConfigStore } from "../../store/ConfigStore";

interface ISendingChainSheet {
  sheetRef: React.RefObject<BottomSheetMethods>;
  data: TokenInfo[];
}

const SendingTokenSheet = ({ sheetRef, data }: ISendingChainSheet) => {
  const { setSelectedSendingToken } = useConfigStore();
  const renderItem = ({ item }: { item: TokenInfo }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedSendingToken(item);
          sheetRef.current?.close();
        }}
      >
        <View style={styles.tokenImage}>
          {item.logoURI!.includes(".svg") ? (
            <SvgFromUri
              uri={
                item.logoURI!
                  ? item.logoURI!
                  : "https://media.socket.tech/Matic.svg"
              }
              width={"100%"}
              height={"100%"}
              style={{
                borderRadius: 20,
              }}
            />
          ) : (
            <Image
              source={{ uri: item.logoURI! }}
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
        keyExtractor={(item) => item.address.toString()}
      />
    </Sheet>
  );
};

export default SendingTokenSheet;

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
  tokenImage: {
    height: 40,
    width: 40,
    overflow: "hidden",
    borderRadius: 100,
  },
});
