import React, { useEffect } from "react";

//@libraries
import LinearGradient from "react-native-linear-gradient";

//@styles
import Theme from "@Theme/index";
import { Title } from "./styles";

// import { Container } from './styles';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      //ir para a próxima tela
    }, 15000);
  }, []);

  return (
    <LinearGradient
      colors={Theme.COLORS.GRADIENT}
      start={{ x: 0, y: 1 }}
      end={{ x: 0.5, y: 0.5 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title>GoPizza</Title>
    </LinearGradient>
  );
};

export { SplashScreen };
