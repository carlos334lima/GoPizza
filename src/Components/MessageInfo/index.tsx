import Theme from "@Theme/index";

//@libraries
import { showMessage, MessageType } from "react-native-flash-message";

//@utils
import { TypeShowMessage } from "@Types/interfaces";

function RenderTitleMessage(type: MessageType = TypeShowMessage.default) {
  if (type === TypeShowMessage.aviso || TypeShowMessage.erro) {
    return "Ops...";
  } else if (type === TypeShowMessage.sucesso) {
    return "Deu certo!";
  } else {
    return "Opa";
  }
}

export function RenderMessageTop(message: string, type: MessageType) {
  return showMessage({
    message: RenderTitleMessage(type),
    description: message,
    type: type,
    duration: 2500,
    floating: true,
    textStyle: { fontFamily: Theme.FONTS.Roboto_Bold },
    animated: true,
  });
}
