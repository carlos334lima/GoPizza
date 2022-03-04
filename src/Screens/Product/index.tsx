import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from "react-native";

//@libraries
import { useForm } from "react-hook-form";
import storage from "@react-native-firebase/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import FlashMessage from "react-native-flash-message";
import firestore from "@react-native-firebase/firestore";

//@components
import { Photo } from "@Components/Photo";
import { Input } from "@Components/Input";
import { InputPrice } from "@Components/InputPrice";
import { Button } from "@Components/Buttons/Button";
import { HideKeyboard } from "@Components/HideKeyboard";
import { ButtonBack } from "@Components/Buttons/ButtonBack";
import { OptionsImagePickerActionSheet } from "@Components/ActionSheet/OptionsImagePicker";

//@utils
import { helpers } from "@Utils/Helpers";
import { schemaProduct } from "@Utils/Schemas";

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
  Header,
} from "./styles";
import { RenderMessageTop } from "@Components/MessageInfo";

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaProduct),
  });

  const optionsImagePickerActionSheetRef = useRef<any | null>();

  const [image, setImage] = useState<string>("");

  async function handlePressLoadLibraryPhotos() {
    const result = await helpers.handleOpenLibrary();
    setImage(result);
     optionsImagePickerActionSheetRef.current.hide(); 
  }

  async function handlePressOpenCamera() {
   /*  optionsImagePickerActionSheetRef.current.hide(); */
    await helpers.handleOpenCamera();
  }

  async function handleAddPizza({
    name,
    description,
    sizeG,
    sizeM,
    sizeP,
  }: IForm) {
    const sizePUnmasked = helpers.formartUnmasked(sizeP);
    const sizeMUnmasked = helpers.formartUnmasked(sizeM);
    const sizeGUnmasked = helpers.formartUnmasked(sizeG);

     if (!image) {
      RenderMessageTop("Selecione uma imagem!", "danger");
      return;
    }

    const fileName = `image${new Date().getTime()}`;
    const reference = storage().ref(`/pizzasImages/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name?.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: sizePUnmasked,
          m: sizeMUnmasked,
          g: sizeGUnmasked,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => {
        RenderMessageTop("Pizza cadastrada com sucesso!", "success");
      })
      .catch(() => {
        RenderMessageTop("Não foi possível cadastrar a pizza!", "danger");
      }); 
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
              isLoading={isSubmitting}
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
