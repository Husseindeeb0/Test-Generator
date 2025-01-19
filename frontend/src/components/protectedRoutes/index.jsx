import { useEffect, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../loader";
import verifyRefreshAuth from "../../utils/verifyRefreshAuth";
import { GlobalContext } from "../../context";

const ProtectedRoutes = () => {
  const { setAccessToken, accessToken, isAuthenticated, setIsAuthenticated, fetchUserTests } =
    useContext(GlobalContext); // Manage access token in context
  const location = useLocation();
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await verifyRefreshAuth(
        accessToken,
        refreshToken,
        setAccessToken
      );
      if (authStatus) {
        await fetchUserTests();
      };
      setIsAuthenticated(authStatus); // Set authentication to true or false
    };

    verifyAuth();
  }, [accessToken, refreshToken, setAccessToken]);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/home" />;
  }

  return <Outlet /> || <Navigate to="/home" />;
};

export default ProtectedRoutes;
