import {useContext} from "react";
import UserContext from "../context/userContext";

const useUserData = () => useContext(UserContext);

export default useUserData;
