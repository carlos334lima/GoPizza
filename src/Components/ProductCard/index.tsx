import React from "react";
import { Image } from "react-native";

//@libraries
import Icon from "react-native-vector-icons/Feather";

//@utils
import { ProductProps } from "@Types/interfaces";

//@styles
import Theme from "@Theme/index";
import {
  Container,
  Content,
  Description,
  Details,
  Identification,
  Name,
} from "./styles";

const ProductCard = ({ ...rest }: ProductProps) => {
  return (
    <Container>
      <Content {...rest}>
        <Image />

        <Details>
          <Identification>
            <Name>Margarita</Name>
            <Icon name="chevron-right" size={18} color={Theme.COLORS.SHAPE} />
          </Identification>

          <Description>teste</Description>
        </Details>
      </Content>
    </Container>
  );
};

export { ProductCard };
