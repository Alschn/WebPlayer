import {createContext, FC, ReactNode} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  token: null,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({children}) => {
  const [token] = useLocalStorage('token');

  return (
    <AuthContext.Provider value={{
      isAuthenticated: token != null,
      token: token,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
