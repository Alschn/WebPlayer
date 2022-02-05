import {createContext, FC, ReactNode, useEffect, useState} from "react";
import axiosClient from "../utils/axiosClient";
import useLocalStorage from "../hooks/useLocalStorage";

interface UserContextProps {
  username: string | undefined;
  imageURL: string | undefined;
  spotifyURL: string | undefined;
  id: string | undefined;
  followers: number | undefined;
  hasPremium: boolean | undefined;
}

export const UserContext = createContext<UserContextProps>({
  username: undefined,
  imageURL: undefined,
  spotifyURL: undefined,
  id: undefined,
  followers: undefined,
  hasPremium: undefined,
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {
  const [token] = useLocalStorage('token');
  const [userData, setUserData] = useState<UserContextProps>();

  useEffect(() => {
    if (!userData && token) {
      axiosClient.get(`/spotify/users`)
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
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
