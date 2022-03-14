
//@libraries
import styled from "styled-components/native";

//@styles
import Theme from "@Theme/index";

export const Container = styled.View`
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.Text`
  color: ${Theme.COLORS.ALERT_900};
  font-family: ${Theme.FONTS.DM_Sans};
  margin-top: 20px;
  width: 85%;
  text-align: center;
  font-size: 18px;
`;
