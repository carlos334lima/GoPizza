import React from "react";
import { Image } from "react-native";

//@assets
import thoughtful from "@Assets/thoughtful.png";

//@styles
import { Container, Message } from "./styles";

type IProps = {
  message: string;
};

export function ListEmpty({ message }: IProps) {
  return (
    <Container>
      <Image source={thoughtful} height={100} width={100} />
      <Message>{message}</Message>
    </Container>
  );
}
