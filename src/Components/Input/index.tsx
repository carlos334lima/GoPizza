import React from "react";
import { TextInputProps, View } from "react-native";

//@types
import { TypeProps } from "@Types/interfaces";

//@styles
import { Container } from "./styles";
import { Control, Controller } from "react-hook-form";
import { ErrorMessageInput } from "@Screens/SignIn/styles";
import { RenderMessageTop } from "@Components/MessageInfo";

type Props = TextInputProps & {
  type?: TypeProps;
  name: string;
  error: string;
  control: Control<any>;
};

export function Input({
  type = "primary",
  name,
  error,
  control,
  ...rest
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Container
            type={type}
            error={error}
            value={value}
            onChangeText={onChange}
            {...rest}
          />
          {error && RenderMessageTop(error, "danger")}
        </>
      )}
    />
  );
}
