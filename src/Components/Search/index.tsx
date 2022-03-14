import React from "react";
import { TextInputProps } from "react-native";

//@libraries
import Icon from "react-native-vector-icons/Feather";

//@styles
import Theme from "@Theme/index";
import { Button, ButtonClear, Container, Input, InputArea } from "./styles";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

const Search = ({ onClear, onSearch, value, ...rest }: Props) => {
  return (
    <Container>
      <InputArea>
        <Input placeholder="pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
          <Icon name="x" size={16} />
        </ButtonClear>
      </InputArea>

      <Button onPress={onSearch}>
        <Icon name="search" size={16} color={Theme.COLORS.TITLE} />
      </Button>
    </Container>
  );
};

export { Search };
