import React from "react";

//@types
import { TypeProps } from "@Types/interfaces";

//@styles
import { Container, Title, Load } from "./styles";

type Props = {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
  onPress: () => void;
};

export function Button({
  title,
  type = "primary",
  isLoading = false,
  onPress,
  ...rest
}: Props) {
  return (
    <Container type={type} onPress={onPress} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
}
