import React from "react";
import { TextInputProps } from "react-native";

//@types
import { TypeProps } from "@Types/interfaces";

//@styles
import { Container } from "./styles";

type Props = TextInputProps & {
  type?: TypeProps;
};

export function Input({ type = "primary", ...rest }: Props) {
  return <Container type={type} {...rest} />;
}
