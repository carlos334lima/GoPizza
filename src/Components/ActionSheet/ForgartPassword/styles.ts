//@libraries
import styled from "styled-components/native";

//@styles
import Theme from "@Theme/index";

export const ContentWrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const ContentText = styled.Text`
  font-size: 20px;
  font-family: ${Theme.FONTS.DM_Sans};
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  width: 90%;
  height: 70%;
  background-color: ${Theme.COLORS.PRIMARY_800};
  border-radius: 12;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${Theme.COLORS.SUCCESS_50};
  font-size: 14px;
  font-family: ${Theme.FONTS.DM_Sans};
`;

export const WarningText = styled.Text`
  color: ${Theme.COLORS.SECONDARY_400};
  font-size: 14px;
  font-family: ${Theme.FONTS.DM_Sans};
  width: 90%;
  margin-top: 30px;
`;

export const ErrorMessageInput = styled.Text`
  margin: 3px 3px 0px 5px;
  font-family: ${Theme.FONTS.Roboto_Bold};
  color: ${Theme.COLORS.PRIMARY_900};
  font-size: 16px;
`;

export const stylesForgotPasswordActionSheet = {
  buttonBox: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.COLORS.SUCCESS_50,
  },
  buttonText: {
    fontSize: 18,
  },
  titleBox: {
    height: 255,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Theme.COLORS.SUCCESS_50,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
};
