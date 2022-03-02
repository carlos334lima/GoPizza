import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";

//@libraries
import { yupResolver } from "@hookform/resolvers/yup";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useForm, FieldValues } from "react-hook-form";

//@components
import { Input } from "@Components/Input";
import { Button } from "@Components/Buttons/Button";

//@styles
import Theme from "@Theme/index";
import {
  Brand,
  Content,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  PasswordWrapper,
  Title,
} from "./styles";

//@libraries
import FlashMessage from "react-native-flash-message";

//@components
import { ForgotPasswordActionSheet } from "@Components/ActionSheet/ForgartPassword";

//@utils
import { useAuth } from "@Hooks/auth";
import brandImg from "@Assets/brand.png";
import { schemaLogin } from "@Utils/Schemas";

type IDataForm = FieldValues & {
  email?: any;
  password?: any;
};

const SignIn = () => {
  const ActionSheetForgotPasswordRef = useRef<any | null>();
  const { signIn, forgotPassword, isLogging } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const [isSecretPasswordVisible, setIsSecretPasswordVisible] =
    useState<Boolean>(true);

  const IconIsVisible = !isSecretPasswordVisible ? "eye" : "eye-off";

  function handleConfirmDataForm({ email, password }: IDataForm) {
    signIn(email, password);
  }

  function handleForgotPassword() {
    ActionSheetForgotPasswordRef.current.show();
  }

  //ActionSheet
  function handleConfirmActionSheet({ email }: IDataForm) {
    ActionSheetForgotPasswordRef.current.hide();
    forgotPassword(email);
  }

  function handleCancelActionSheet() {
    ActionSheetForgotPasswordRef.current.hide();
  }

  return (
    <LinearGradient
      colors={Theme.COLORS.GRADIENT}
      start={{ x: 0, y: 1 }}
      end={{ x: 0.5, y: 0.5 }}
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={brandImg} />

          <Title>Login</Title>
          <Input
            name="email"
            control={control}
            placeholder="E-mail *"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={false}
            error={errors.email && errors.email.message}
          />
          <PasswordWrapper>
            <Input
              name="password"
              control={control}
              placeholder="Senha *"
              type="secondary"
              secureTextEntry={isSecretPasswordVisible as any}
              error={errors.password && errors.password.message}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setIsSecretPasswordVisible(!isSecretPasswordVisible)
              }
            >
              <Icon
                name={IconIsVisible}
                size={20}
                style={{
                  marginLeft: -35,
                  marginTop: 18,
                  color: Theme.COLORS.SUCCESS_50,
                }}
              />
            </TouchableOpacity>
          </PasswordWrapper>
          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Confirmar"
            onPress={handleSubmit(handleConfirmDataForm)}
            //onPress={signOut}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
      <FlashMessage position="top" />
      <ForgotPasswordActionSheet
        ref={ActionSheetForgotPasswordRef}
        onPressConfirm={handleConfirmActionSheet}
        onPressCancel={handleCancelActionSheet}
      />
    </LinearGradient>
  );
};

export { SignIn };
