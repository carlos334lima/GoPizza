import React, { useState, useEffect } from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from "react-native";

//@libraries
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

//@components

//@styles
import {
  Container,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
  Header,
} from "./styles";
import LinearGradient from "react-native-linear-gradient";
import Theme from "@Theme/index";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { ButtonBack } from "@Components/Buttons/ButtonBack";
import { Photo } from "@Components/Photo";

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

const Product = () => {
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title>Cadastrar</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri="" />
          <PickImageButton
            title="Carregar"
            type="secondary"
            onPress={() => {}}
          />
        </Upload>
      </ScrollView>
    </Container>
  );
};

export { Product };
