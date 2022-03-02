import { RenderMessageTop } from "@Components/MessageInfo";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

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
};
