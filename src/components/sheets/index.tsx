import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback } from "react";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Portal } from "@gorhom/portal";
import colors from "../../utils/colors";

export interface IBottomSheet extends BottomSheetProps {
  children: React.ReactNode;
}

const Sheet = React.forwardRef<BottomSheetMethods, IBottomSheet>(
  (props, ref) => {
    const renderBackdrop = useCallback(
      (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    );

    return (
      <Portal>
        <BottomSheet
          index={-1}
          ref={ref}
          handleIndicatorStyle={{
            width: "15%",
            backgroundColor: "gray",
          }}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: colors.foreground,
          }}
          {...props}
        ></BottomSheet>
      </Portal>
    );
  }
);

export default Sheet;
