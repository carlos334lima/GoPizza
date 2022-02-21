import React, { forwardRef } from "react";
import { View } from "react-native";

//@components
import { Input } from "@Components/Input";

//@libraries
import { yupResolver } from "@hookform/resolvers/yup";
import { ActionSheetCustom } from "react-native-actionsheet";
import { useForm, Controller, Control, FieldValues } from "react-hook-form";

//@styles
import Theme from "@Theme/index";
import {
  ButtonText,
  ButtonWrapper,
  ContentText,
  ContentWrapper,
  stylesForgotPasswordActionSheet,
  WarningText,
  ErrorMessageInput,
} from "./styles";

//@utils
import { schemaForgotPassword } from "@Utils/Schemas";

type IForgotPasswordActionSheet = {
  onPressConfirm: (email: any | string) => void;
  onPressCancel: () => void;
};

type IRenderInputHookForm = {
  error: string;
  control: Control<FieldValues, object>;
};

const ForgotPasswordActionSheet = forwardRef(
  (props: IForgotPasswordActionSheet, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schemaForgotPassword),
    });

    function handlePressConfirmEmail(email: string) {
      props.onPressConfirm(email);
      reset();
    }

    function handlePressCancel() {
      props.onPressCancel();
      reset();
    }

    function RenderButtonConfirm() {
      return (
        <ButtonWrapper
          style={{ backgroundColor: Theme.COLORS.SUCCESS_900 }}
          onPress={handleSubmit(handlePressConfirmEmail as any)}
        >
          <ButtonText>Confirmar</ButtonText>
        </ButtonWrapper>
      );
    }

    function RenderButtonCancel() {
      return (
        <ButtonWrapper onPress={handlePressCancel}>
          <ButtonText>Cancelar</ButtonText>
        </ButtonWrapper>
      );
    }

    function RenderInputHookForm(props: IRenderInputHookForm) {
      return (
        <>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail *"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {<ErrorMessageInput>{props?.error}</ErrorMessageInput>}
        </>
      );
    }

    function RenderContent() {
      return (
        <ContentWrapper>
          <ContentText>Insira seu e-mail</ContentText>
          <View style={{ width: "90%" }}>
            <RenderInputHookForm
              control={control}
              error={errors.email && errors.email.message}
            />
            <WarningText>
              Insira seu e-mail cadastrado para ser enviado o passo a passo para
              redefinição de senha.
            </WarningText>
          </View>
        </ContentWrapper>
      );
    }

    return (
      <ActionSheetCustom
        ref={ref as any}
        title={<RenderContent />}
        options={[<RenderButtonConfirm />, <RenderButtonCancel />, ""]}
        styles={stylesForgotPasswordActionSheet}
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

export { ForgotPasswordActionSheet };
