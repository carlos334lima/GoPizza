import React from "react";
import { StatusBar } from "react-native";

//@libraries
import { ThemeProvider } from "styled-components/native";

//@screens
import { SignIn } from "./src/Screens/SignIn";
import { Product } from "@Screens/Product";

//@utils
import { AuthProvider } from "@Hooks/auth";

//@style
import Theme from "./src/Theme";
import { Home } from "@Screens/Home";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        />
        <Home />
      </ThemeProvider>
    </AuthProvider>
  );
}
