import React from "react";

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
  Image,
  Line,
  Name,
} from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";
import { TouchableOpacityProps } from "react-native";

type IProps = TouchableOpacityProps & {
  data: ProductProps;
}

const ProductCard = ({data, ...rest}: IProps) => {
  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }}/>

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Icon name="chevron-right" size={18} color={Theme.COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content> 
      <Line />
    </Container>
  );
};

export { ProductCard };
