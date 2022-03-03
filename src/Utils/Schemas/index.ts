//@libraries
import * as Yup from "yup";

export const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email("Digite um e-mail válido!")
    .required("E-mail é obrigatório!"),
  password: Yup.string()
    .min(5, "A senha deve conter no mínimo 5 caracteres!")
    .required("Senha é obrigatória!"),
});

export const schemaForgotPassword = Yup.object().shape({
  email: Yup.string()
    .email("Digite um e-mail válido!")
    .required("E-mail é obrigatório!"),
});

export const schemaProduct = Yup.object().shape({
  name: Yup.string().required("Nome da pizza é obrigatório!"),
  description: Yup.string().required("Descrição da pizza é obrigatório!"),
  sizeP: Yup.string().required("Valor da pizza é obrigatório!"),
  sizeM: Yup.string().required("Valor da pizza é obrigatório!"),
  sizeG: Yup.string().required("Valor da pizza é obrigatório!"),
});
