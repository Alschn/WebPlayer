import {createContext, Dispatch, FC, ReactNode, SetStateAction, useState} from "react";

export interface UserProfile {
  email: string;
  display_name: string,
  country: string,
  explicit_content: {
    filter_enabled: boolean,
    filter_locked: boolean
  },
  external_urls: {
    spotify: string
  },
  followers: {
    href: string,
    total: number
  },
  href: string,
  id: string,
  images: {
    height: number | null,
    url: string,
    width: number | null
  }[],
  product: string,
  type: string,
  uri: string
}

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  user: UserProfile | null,
  setUser: Dispatch<SetStateAction<UserProfile | null>>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({children}) => {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? token : null;
  });

  // todo merge user context with auth context
  const [user, setUser] = useState<UserProfile | null>(null);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: token != null,
      token: token,
      setToken: setToken,
      user: user,
      setUser: setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
