import 'react-native-gesture-handler';

import React from "react";
import { StatusBar } from "react-native";

//@libraries
import { ThemeProvider } from "styled-components/native";

//@utils
import { AuthProvider } from "@Hooks/auth";
import { Routes } from "@Utils/Navigation";

//@style
import Theme from "./src/Theme";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor="transparent"
        />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}
