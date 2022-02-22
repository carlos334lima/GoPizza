import React from "react";
import { TouchableOpacityProps } from "react-native";

//@libraries
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//@styles
import Theme from "@Theme/index";
import { Container } from "./styles";

export function ButtonBack({ ...rest }: TouchableOpacityProps) {
  return (
    <Container {...rest}>
      <Icon name="chevron-left" size={18} color={Theme.COLORS.TITLE} />
    </Container>
  );
}
