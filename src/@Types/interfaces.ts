export type TypeProps = "primary" | "secondary";

export type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

export type IAddPizzaStorage = {
  name: string;
  name_insensitive: string;
  description: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
  photo_url: string;
  photo_path: string;
};

export type ProductNavigationProps = {
  id?: string;
};

export type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export enum TypeShowMessage {
  aviso = "warning",
  erro = "danger",
  sucesso = "success",
  default = "default",
  info = "info",
  none = "none",
}
