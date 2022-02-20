export type TypeProps = "primary" | "secondary";

export type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

export enum TypeShowMessage {
  aviso = "warning",
  erro = "danger",
  sucesso = "success",
  default = "default",
  info = "info",
  none = "none",
}
