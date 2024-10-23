import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import AuthError from "../screens/AuthError";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <AuthError />;
};

export default PrivateRoute;
