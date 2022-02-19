//@libraries
import styled, { css } from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

//@styles
import Theme from "@Theme/index";

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 24px;
  align-self: flex-start;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.DM_Serif_Display};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const Brand = styled.Image.attrs({
  resizeMode: "contain",
})`
  height: 340px;
  margin-top: 64px;
  margin-bottom: 32px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 20px;
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.DM_Sans};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const PasswordWrapper = styled.View`
  flex-direction: row;
`;

export const ErrorMessageInput = styled.Text`
  bottom: 10px;
  margin: 3px 3px 0px 5px;
  font-family: ${Theme.FONTS.Roboto_Bold};
  color: ${Theme.COLORS.ALERT_700};
  font-size: 16px;
`;
