import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

type IContainer = {
  error: string;
}

export const Container = styled.View<IContainer>`
  width: 100%;
  height: 56px;
  border: 1px solid ${({ theme, error }) => error ? theme.COLORS.ALERT_900 :theme.COLORS.SHAPE};
  border-radius: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Size = styled.View`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-right: 18px;
`;

export const Label = styled.Text`
  font-size:14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.DM_Sans};
    color: ${theme.COLORS.SECONDARY_900};
  `};
`;

export const Input = styled(TextInput)`
  flex: 1;
  margin-left: 7px;
`;