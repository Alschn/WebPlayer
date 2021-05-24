import {createContext} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  token: null,
});

export default AuthContext;
