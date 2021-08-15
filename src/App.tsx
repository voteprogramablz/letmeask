import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { auth, firebase } from './services/firebase';

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

function App() {
  const [user, setUser] = useState<User>(); //Criando um estado para transformar o valor que vamos enviar por context

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
    <div>
      <BrowserRouter> 
        <AuthContext.Provider value={{ user, signInWithGoogle }}> {/* o componente 'Provider' SEMPRE recebe uma propriedade 'value', que é o valor do contexto. A primeira chave indica que estamos inserindo um código JS, a segunda é que estamos enviando um objeto.
        Como o 'TestContext.Provider está englobando as rotas abaixo, elas conseguirão acessar o valor do contexto definido.*/}
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
