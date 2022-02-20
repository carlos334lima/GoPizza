import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

//@libraries
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RenderMessageTop } from "@Components/MessageInfo";
import { TypeShowMessage } from "@Types/interfaces";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLogging: boolean;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    setIsLogging(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then((profile) => {
            const { isAdmin, name } = profile.data() as User;

            const userData = {
              id: account.user.uid,
              name,
              isAdmin,
            };

            setUser(userData);
          });
      })
      .catch((error) => {
        RenderMessageTop(
          "Não foi possivel buscar dados de perfil do usuário",
          TypeShowMessage.erro
        );
      })
      .catch((error) => {
        const { code } = error;

        const userNotFound = "auth/user-not-found";
        const passwordNotCorrect = "auth/wrong-password";

        if (code === userNotFound || code === passwordNotCorrect) {
          RenderMessageTop("E-mail e/ou Senha inválidos", TypeShowMessage.erro);
        } else {
          RenderMessageTop(
            "Não foi possivel realizar login",
            TypeShowMessage.erro
          );
        }
      })
      .finally(() => {
        setIsLogging(false);
      });
  }

  return (
    <AuthContext.Provider value={{ signIn, isLogging }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthProvider };
