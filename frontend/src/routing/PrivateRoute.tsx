import {FC} from "react";
import useAuth from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}


const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{from: location}}/>;
  }

  return children;
};

export default PrivateRoute;
