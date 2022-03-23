import React, { useState, useEffect, useRef } from "react";
import { Platform, TouchableOpacity, ScrollView } from "react-native";

//@libraries
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import FlashMessage from "react-native-flash-message";

//@components
import { Photo } from "@Components/Photo";
import { Input } from "@Components/Input";
import { InputPrice } from "@Components/InputPrice";
import { Button } from "@Components/Buttons/Button";
import { HideKeyboard } from "@Components/HideKeyboard";
import { RenderMessageTop } from "@Components/MessageInfo";
import { ButtonBack } from "@Components/Buttons/ButtonBack";
import { OptionsImagePickerActionSheet } from "@Components/ActionSheet/OptionsImagePicker";

//@utils
import { helpers } from "@Utils/Helpers";
import { schemaProduct } from "@Utils/Schemas";
import { IAddPizzaStorage, ProductProps } from "@Types/interfaces";

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
  const route = useRoute();
  const { goBack } = useNavigation();
  const optionsImagePickerActionSheetRef = useRef<any | null>();

  const { data } = route.params as any;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaProduct),
    defaultValues: {
      name: data?.name,
      description: data?.description,
      sizeP: data?.sizeP,
      sizeM: data?.sizeM,
      sizeG: data?.sizeG,
    },
  });

  const [image, setImage] = useState<string>(data?.image ? data?.image : "");

  async function handlePressLoadLibraryPhotos() {
    const result = await helpers.handleOpenLibrary();
    setImage(result as string);
    optionsImagePickerActionSheetRef.current.hide();
  }

  async function handlePressOpenCamera() {
    await helpers.handleOpenCamera();
  }

  async function handleAddPizza({
    name,
    description,
    sizeG,
    sizeM,
    sizeP,
  }: IForm) {
    const sizePUnmasked = helpers.formartUnmasked(sizeP as string);
    const sizeMUnmasked = helpers.formartUnmasked(sizeM as string);
    const sizeGUnmasked = helpers.formartUnmasked(sizeG as string);

    if (!image) {
      RenderMessageTop("Selecione uma imagem!", "danger");
      return;
    }

    const { fullPath, photo_url } = await helpers.savePhotoUrl(image);

    const data = {
      name,
      name_insensitive: name?.toLowerCase().trim(),
      description,
      prices_sizes: {
        p: sizePUnmasked,
        m: sizeMUnmasked,
        g: sizeGUnmasked,
      },
      photo_url,
      photo_path: fullPath,
    };

    await helpers.addPizzaStorage(data as IAddPizzaStorage);
  }

  const isNewPizza = data?.name ? false : true;

  return (
    <HideKeyboard>
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <ButtonBack onPress={() => goBack()} />
            <Title>Cadastrar</Title>
            <TouchableOpacity>
              {!isNewPizza && <DeleteLabel>Deletar</DeleteLabel>}
            </TouchableOpacity>
          </Header>

          <Upload>
            <Photo uri={image} />
            {isNewPizza && (
              <PickImageButton
                title="Carregar"
                type="secondary"
                onPress={() => optionsImagePickerActionSheetRef.current.show()}
              />
            )}
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

            {isNewPizza && (
              <Button
                title="Cadastrar Pizza"
                onPress={handleSubmit(handleAddPizza)}
                isLoading={isSubmitting}
              />
            )}
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
