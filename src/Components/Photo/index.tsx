import React from "react";

//@styles
import { Image, Placeholder, PlaceholderTitle } from "./styles";

type Props = {
  uri: string | null;
};

export function Photo({ uri }: Props) {
  if (uri) {
    return <Image source={{ uri }} resizeMode="cover"/>;
  }

  return (
    <Placeholder>
      <PlaceholderTitle>Nenhuma foto{"\n"}carregada</PlaceholderTitle>
    </Placeholder>
  );
}
