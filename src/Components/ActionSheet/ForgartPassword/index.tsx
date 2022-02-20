import { Input } from "@Components/Input";
import Theme from "@Theme/index";
import React, { ForwardedRef, forwardRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

//@libraries
import { ActionSheetCustom } from "react-native-actionsheet";
import { getBottomSpace } from "react-native-iphone-x-helper";

const ForgotPasswordActionSheet = forwardRef<ForwardedRef<unknown>>(
  (props, ref) => {
    function RenderButtonConfirm() {
      return (
        <TouchableOpacity
          style={{
            width: "90%",
            height: "70%",
            backgroundColor: Theme.COLORS.PRIMARY_800,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: 'center',
            marginBottom: 10
          }}
        >
          <Text>Confirmar</Text>
        </TouchableOpacity>
      );
    }

    function RenderTitle() {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: Theme.FONTS.DM_Sans,
              marginBottom: 30,
            }}
          >
            Insira seu e-mail
          </Text>
          <View style={{ width: "90%" }}>
            <Input placeholder="E-mail *" />
          </View>
        </View>
      );
    }

    return (
      <ActionSheetCustom
        ref={ref as any}
        title={<RenderTitle />}
        options={[<RenderButtonConfirm />, "Cancelar", ""]}
        styles={stylesActionSheet}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => {
          if (index === 0) {
            console.log("chegou");
          }
        }}
      />
    );
  }
);

export const stylesActionSheet = {
  buttonBox: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.COLORS.SUCCESS_50,
  },
  buttonText: {
    fontSize: 18,
  },
  titleBox: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.COLORS.SUCCESS_50,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
};

export { ForgotPasswordActionSheet };
