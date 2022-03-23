import React from "react";
import { ActivityIndicator } from "react-native";

// @Styles
import Theme from "@Theme/index";
import { Container } from "./styles";

interface Props {
  color?: any;
}

const Loading = ({ color }: Props): JSX.Element => {
  return (
    <Container>
      <ActivityIndicator
        size="small"
        color={color || Theme.COLORS.PRIMARY_900}
        style={{ opacity: 1, marginBottom: 20 }}
      />
    </Container>
  );
};

export { Loading };
