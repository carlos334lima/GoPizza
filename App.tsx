import React from "react";
import { StatusBar } from "react-native";

//@libraries
import { ThemeProvider } from "styled-components/native";

//@screens
import { SignIn } from "./src/Screens/SignIn";

//@style
import Theme from "./src/Theme";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar
        translucent
        barStyle={"light-content"}
        backgroundColor="transparent"
      />
      <SignIn />
    </ThemeProvider>
  );
}
