import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

//@libraries
import { yupResolver } from "@hookform/resolvers/yup";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useForm, Controller, Control, FieldValues } from "react-hook-form";

//@components
import { Input } from "@Components/Input";
import { Button } from "@Components/Button";

//@styles
import Theme from "@Theme/index";
import {
  Brand,
  Content,
  ErrorMessageInput,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  PasswordWrapper,
  Title,
} from "./styles";

//@utils
import { schemaLogin } from "@Utils/Schemas";
import brandImg from '@Assets/brand.png'
import { TypeProps } from "@Types/interfaces";

type IRenderHookFormInput = TextInputProps & {
  name: string;
  type: TypeProps;
  error: string;
  control: Control<FieldValues, object>;
};

type IDataForm = FieldValues & {
  email?: string;
  password?: string;
};

const SignIn = () => {
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

  function handleConfirmDataForm(data: IDataForm) {
    console.log("data", data);
  }

  function handleForgotPassword() {}

  function RenderHookFormInput(props: IRenderHookFormInput) {
    return (
      <View style={{ width: "100%" }}>
        <Controller
          name={props.name}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder={props?.placeholder}
              type={props?.type}
              autoCorrect={props?.autoCorrect}
              autoCapitalize={props?.autoCapitalize}
              onChangeText={onChange}
              value={value}
              secureTextEntry={props?.secureTextEntry}
            />
          )}
        />
        {<ErrorMessageInput>{props?.error}</ErrorMessageInput>}
      </View>
    );
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
          <RenderHookFormInput
            name="email"
            placeholder="E-mail *"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={false}
            control={control}
            error={errors.email && errors.email.message}
          />
          <PasswordWrapper>
            <RenderHookFormInput
              name="password"
              placeholder="Senha *"
              type="secondary"
              secureTextEntry={isSecretPasswordVisible as any}
              control={control}
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
          />
        </Content>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export { SignIn };