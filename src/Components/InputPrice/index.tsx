import React from "react";
import { TextInputProps } from "react-native";

//@libraries
import { Controller } from "react-hook-form";

//@components
import { RenderMessageTop } from "@Components/MessageInfo";

//@utils
import { helpers } from "@Utils/Helpers";

//@styles
import { Container, Size, Label, Input } from "./styles";

type Props = TextInputProps & {
  size: string;
  name: string;
  error: any;
  control: any;
};

export function InputPrice({ name, control, size, error, ...rest }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <Container error={error}>
              <Size>
                <Label>{size}</Label>
              </Size>

              <Input
                placeholder="R$"
                keyboardType="numeric"
                onChangeText={onChange}
                value={helpers.formartCurrentBR(value)}
                {...rest}
              />
            </Container>
            {error && RenderMessageTop(error, "danger")}
          </>
        );
      }}
    />
  );
}
