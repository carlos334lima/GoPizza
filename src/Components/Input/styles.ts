import { TypeProps } from "@Types/interfaces";
import { TextInput } from "react-native";

//styles
import styled, { css } from "styled-components/native";

type Props = {
  type: TypeProps;
};

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor:
    type === "primary" ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50,
}))<Props>`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 5px;
  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.DM_Sans};
    border: 1px solid ${theme.COLORS.SHAPE};
    color: ${type === "primary"
      ? theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};
  `};
`;
