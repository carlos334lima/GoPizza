import React from 'react';
import Theme from "./src/Theme";
import { StatusBar, View } from "react-native";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <View />
    </ThemeProvider>
  );
}
