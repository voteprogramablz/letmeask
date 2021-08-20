import { createContext, ReactNode, useState, useEffect  } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string,
    name: string,
    avatar: string,
  }
  
type AuthContextType = {
user: User | undefined,
signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType); // O parâmetro recebe o formato da informação que vamos passar posteriormente, nesse caso vai ser um objeto. E ele deve ser exportado para conseguirmos importá-lo e utilizá-lo depois.

type AuthContextProviderProps = {
    children: ReactNode,
}

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>(); //Criando um estado para transformar o valor que vamos enviar por context

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
      const { displayName, photoURL, uid } = user;
      
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser ({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
      }
    })

    return () => {
      unsubscribe();
    }

  }, []) // Use effect recebe 2 argumentos, o primeiro é uma função, e ela é ativada sempre que o segundo argumento (que sempre será um array, com elementos ou vazio) receber uma alteração durante a exibição da tela.

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)
    
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser ({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}> 
            {props.children}
        </AuthContext.Provider>
    )
}