//@libraries
import * as Yup from "yup";

export const schemaLogin = Yup.object().shape({
  email: Yup.string().email("Digite um e-mail válido!").required("E-mail é obrigatório!"),
  password: Yup.string()
    .min(5, "A senha deve conter no mínimo 5 caracteres!")
    .required("Senha é obrigatória!"),
});

export const schemaForgotPassword = Yup.object().shape({
  email: Yup.string().email("Digite um e-mail válido!").required("E-mail é obrigatório!"),
});
