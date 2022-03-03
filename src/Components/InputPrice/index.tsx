import React from "react";
import { TextInputProps } from "react-native";

//@libraries
import { Control, Controller, FieldValues } from "react-hook-form";

//@utils
import { helpers } from "@Utils/Helpers";

//@styles
import { Container, Size, Label, Input } from "./styles";
import { RenderMessageTop } from "@Components/MessageInfo";

type Props = TextInputProps & {
  size: string;
  name: string;
  error: string;
  control: Control<FieldValues, object> | undefined;
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
