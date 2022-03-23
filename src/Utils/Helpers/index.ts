//@libraries
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { formatWithMask, Masks } from "react-native-mask-input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

//@components
import { RenderMessageTop } from "@Components/MessageInfo";

//@utils
import { GO_PIZZA } from "@Utils/Constants";
import { IAddPizzaStorage, ProductProps } from "@Types/interfaces";
import { useNavigation } from "@react-navigation/native";

export const helpers = {
  handleOpenLibrary: async () => {
    const { assets, errorCode } = await launchImageLibrary({
      mediaType: "photo",
      quality: 1,
    });

    if (errorCode) {
      RenderMessageTop("Houve um erro em carregar sua imagem!", "danger");
    }

    return assets[0]?.uri;
  },

  handleOpenCamera: async () => {
    const { assets, errorCode } = await launchCamera({
      mediaType: "photo",
      cameraType: "front",
    });

    if (errorCode) {
      RenderMessageTop("Houve um erro em abrir sua camera!", "danger");
    }

    return assets[0]?.uri;
  },

  formartCurrentBR: (value: string) => {
    const { masked } = formatWithMask({
      text: value,
      mask: Masks.BRL_CURRENCY,
    });

    return masked;
  },

  formartUnmasked: (value: string) => {
    const { unmasked } = formatWithMask({
      text: value,
      mask: Masks.BRL_CURRENCY,
    });

    return unmasked;
  },

  addPizzaStorage: async (data: IAddPizzaStorage) => {
    firestore()
      .collection(GO_PIZZA.COLLECTION_DATABASE)
      .add(data)
      .then(() => {
        RenderMessageTop("Pizza cadastrada com sucesso!", "success");
      })
      .catch(() => {
        RenderMessageTop("Não foi possível cadastrar a pizza!", "danger");
      });
  },

  savePhotoUrl: async (image: string) => {
    const fileName = `image${new Date().getTime()}`;
    const reference = storage().ref(
      `/${GO_PIZZA.STORAGE_FOLDER_IMAGE}/${fileName}.png`
    );

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    const result = {
      photo_url: photo_url,
      fullPath: reference.fullPath,
    };

    return result;
  },

};
