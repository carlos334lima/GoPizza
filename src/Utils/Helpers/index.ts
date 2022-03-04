import { RenderMessageTop } from "@Components/MessageInfo";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { formatWithMask, Masks } from "react-native-mask-input";

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
};
