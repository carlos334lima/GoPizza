import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

//@libraries
import auth from "@react-native-firebase/auth";
import { TypeShowMessage, User } from "@Types/interfaces";
import firestore from "@react-native-firebase/firestore";

//@components
import { RenderMessageTop } from "@Components/MessageInfo";

//@utils
import {
  clearAllData,
  getDataStorage,
  setDataStorage,
  USER_COLLECTION,
} from "@Utils/LocalStorage";



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

  useEffect(() => {
    loadUserStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    setIsLogging(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { isAdmin, name } = profile.data() as User;

            const userData = {
              id: account.user.uid,
              name,
              isAdmin,
            };

            await setDataStorage(USER_COLLECTION, userData);

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

  async function signOut() {
    auth().signOut();
    clearAllData(USER_COLLECTION);
    setUser(null);
  }

  async function loadUserStorageData() {
    setIsLogging(true);

    const user = await getDataStorage(USER_COLLECTION);

    if (user) {
      setUser(user);
    }

    setIsLogging(false);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLogging, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthProvider };
