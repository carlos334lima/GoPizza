import React, { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

type IHideKeyboard = {
  children: ReactNode;
};

export function HideKeyboard({ children }: IHideKeyboard) {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
