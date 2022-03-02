import React, { useState, useEffect, useRef } from "react";
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
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

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
import { OptionsImagePickerActionSheet } from "@Components/ActionSheet/OptionsImagePicker";
import { helpers } from "@Utils/Helpers";

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

const Product = () => {
  const optionsImagePickerActionSheetRef = useRef<any | null>();

  const [image, setImage] = useState<Promise<any> | (() => Promise<any>)>('')

   async function handlePressLoadLibraryPhotos() {
    optionsImagePickerActionSheetRef.current.hide();
    const result = await helpers.handleOpenLibrary();
    console.log('teste', result)
   setImage(result)  
    
  }
  
  async function handlePressOpenCamera() {
    optionsImagePickerActionSheetRef.current.hide();
    await helpers.handleOpenCamera()
  }

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
          <Photo uri={image} />
          <PickImageButton
            title="Carregar"
            type="secondary"
            onPress={() => optionsImagePickerActionSheetRef.current.show()}
          />
        </Upload>
      </ScrollView>

      <OptionsImagePickerActionSheet
        ref={optionsImagePickerActionSheetRef}
        handlePressCamera={handlePressOpenCamera}
        handlePressLibraryImage={handlePressLoadLibraryPhotos}
      />
    </Container>
  );
};

export { Product };
