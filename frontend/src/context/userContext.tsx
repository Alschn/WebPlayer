import {createContext, FC, ReactNode, useEffect, useState} from "react";
import useAuth from "../hooks/useAuth";
import AxiosClient from "../api/AxiosClient";

interface UserContextProps {
  username: string | undefined;
  imageURL: string | undefined;
  spotifyURL: string | undefined;
  id: string | undefined;
  followers: number | undefined;
  hasPremium: boolean | undefined;
  clearUser: () => void,
}

export const UserContext = createContext<UserContextProps>({
  username: undefined,
  imageURL: undefined,
  spotifyURL: undefined,
  id: undefined,
  followers: undefined,
  hasPremium: undefined,
  clearUser: () => {}
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {
  const {token} = useAuth();
  const [userData, setUserData] = useState<UserContextProps | undefined>(undefined);

  useEffect(() => {
    if (!userData && token) {
      AxiosClient.get(`/spotify/users/`)
        .then(res => {
          setUserData(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [userData, token]);

  return (
    <UserContext.Provider value={{
      username: userData?.username,
      imageURL: userData?.imageURL,
      spotifyURL: userData?.spotifyURL,
      id: userData?.id,
      followers: userData?.followers,
      hasPremium: userData?.hasPremium,
      clearUser: () => setUserData(undefined),
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
