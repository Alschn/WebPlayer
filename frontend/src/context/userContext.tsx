import {createContext} from "react";

interface UserContextProps {
  username: string | undefined;
  imageURL: string | undefined;
  uid: string | undefined;
}

export const UserContext = createContext<UserContextProps>({
  username: undefined,
  imageURL: undefined,
  uid: undefined,
});

export default UserContext;
