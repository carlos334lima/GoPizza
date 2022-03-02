//@libraries
import styled from "styled-components/native";

//@styles
import Theme from "@Theme/index";

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

export const OptionsImagePickerActionSheetStyles = {
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
      height: 0,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: Theme.COLORS.SUCCESS_50,
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
    },
  };
  