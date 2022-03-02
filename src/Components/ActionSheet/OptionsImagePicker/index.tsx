import React, { forwardRef } from "react";
import { View } from "react-native";

//@libraries
import { ActionSheetCustom } from "react-native-actionsheet";

//@styles
import Theme from "@Theme/index";
import {
  ButtonText,
  ButtonWrapper,
  OptionsImagePickerActionSheetStyles,
} from "./styles";


type IOptionsImagePickerActionSheet = {
  handlePressLibraryImage: (email: any | string) => void;
  handlePressCamera: () => void;
};

const OptionsImagePickerActionSheet = forwardRef(
  (props: IOptionsImagePickerActionSheet, ref) => {
    function RenderButtonConfirm() {
      return (
        <ButtonWrapper
          style={{ backgroundColor: Theme.COLORS.SUCCESS_900 }}
          onPress={props.handlePressLibraryImage}
        >
          <ButtonText>Galeria de fotos</ButtonText>
        </ButtonWrapper>
      );
    }

    function RenderButtonCancel() {
      return (
        <ButtonWrapper onPress={props.handlePressCamera}>
          <ButtonText>Tirar foto</ButtonText>
        </ButtonWrapper>
      );
    }

    return (
      <ActionSheetCustom
        ref={ref as any}
        title={<View />}
        options={[<RenderButtonConfirm />, <RenderButtonCancel />, ""]}
        styles={OptionsImagePickerActionSheetStyles}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => {
          if (index === 2) {
          }
        }}
      />
    );
  }
);

export { OptionsImagePickerActionSheet };
