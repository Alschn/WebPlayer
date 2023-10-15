import {createContext, Dispatch, FC, ReactNode, SetStateAction, useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../api/spotify";
import {Box, CircularProgress} from "@mui/material";

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
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({children}) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const isAuthenticated = !!token;

  const {
    data: userProfile,
    isLoading: isLoadingUserProfile,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getCurrentUser();
      return res.data as UserProfile;
    },
    refetchOnWindowFocus: false,
    enabled: isAuthenticated
  });

  const user = useMemo(() => {
    return userProfile ?? null;
  }, [userProfile]);

  if (isLoadingUserProfile) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!token,
      token: token,
      setToken: setToken,
      user: user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
