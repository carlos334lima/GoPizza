import React from "react";
import { TextInputProps, View } from "react-native";

//@libraries
import { Control, Controller } from "react-hook-form";

//@components
import { RenderMessageTop } from "@Components/MessageInfo";

//@types
import { TypeProps } from "@Types/interfaces";

//@styles
import { Container } from "./styles";

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
