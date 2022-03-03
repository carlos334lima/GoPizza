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
import { InputPrice } from "@Components/InputPrice";
import { Input } from "@Components/Input";
import { useForm } from "react-hook-form";
import { HideKeyboard } from "@Components/HideKeyboard";
import { Button } from "@Components/Buttons/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProduct } from "@Utils/Schemas";
import FlashMessage from "react-native-flash-message";

type IForm = {
  description?: string;
  name?: string;
  sizeG?: string;
  sizeM?: string;
  sizeP?: string;
};

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

const Product = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaProduct),
  });

  const optionsImagePickerActionSheetRef = useRef<any | null>();

  const [image, setImage] = useState<Promise<any> | (() => Promise<any>)>("");

  async function handlePressLoadLibraryPhotos() {
    optionsImagePickerActionSheetRef.current.hide();
    const result = await helpers.handleOpenLibrary();
    setImage(result);
  }

  async function handlePressOpenCamera() {
    optionsImagePickerActionSheetRef.current.hide();
    await helpers.handleOpenCamera();
  }

  function handleAddPizza(form: IForm) {
    console.log("teste", form);
  }

  return (
    <HideKeyboard>
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

          <Form>
            <InputGroup>
              <Label>Nome</Label>
              <Input
                name="name"
                control={control}
                placeholder="Digite o nome da pizza"
                error={errors.name && errors.name.message}
              />
            </InputGroup>
            <InputGroup>
              <Label>Descrição</Label>
              <Input
                name="description"
                control={control}
                placeholder="Descreva a pizza"
                multiline
                maxLength={60}
                style={{ height: 80 }}
                error={errors.description && errors.description.message}
              />
            </InputGroup>
            <InputGroup>
              <Label>Tamanhos e preços</Label>

              <InputPrice
                name="sizeP"
                control={control}
                size="P"
                error={errors.sizeP && errors.sizeP.message}
              />
              <InputPrice
                name="sizeM"
                control={control}
                size="M"
                error={errors.sizeM && errors.sizeM.message}
              />
              <InputPrice
                name="sizeG"
                control={control}
                size="G"
                error={errors.sizeG && errors.sizeG.message}
              />
            </InputGroup>

            <Button
              title="Cadastrar Pizza"
              onPress={handleSubmit(handleAddPizza)}
              /* isLoading={isLoading} */
            />
          </Form>
        </ScrollView>

        <OptionsImagePickerActionSheet
          ref={optionsImagePickerActionSheetRef}
          handlePressCamera={handlePressOpenCamera}
          handlePressLibraryImage={handlePressLoadLibraryPhotos}
        />
        <FlashMessage position="top" />
      </Container>
    </HideKeyboard>
  );
};

export { Product };
