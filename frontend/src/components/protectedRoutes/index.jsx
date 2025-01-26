import { useEffect, useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../loader";
import verifyRefreshAuth from "../../utils/verifyRefreshAuth";
import { GlobalContext } from "../../context";

const ProtectedRoutes = () => {
  const {
    setAccessToken,
    accessToken,
    isAuthenticated,
    setIsAuthenticated,
    fetchUserTests,
  } = useContext(GlobalContext);
  const location = useLocation();
  const refreshToken = localStorage.getItem("refreshToken");
  const [isVerifying, setIsVerifying] = useState(true); // Tracks if auth verification is in progress

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await verifyRefreshAuth(
        accessToken,
        refreshToken,
        setAccessToken
      );

      if (authStatus) {
        await fetchUserTests();
      }

      setIsAuthenticated(authStatus);
      setIsVerifying(false); // Mark verification as complete
    };

    verifyAuth();
  }, [accessToken, refreshToken, setAccessToken]);

  // Show loader while verifying authentication
  if (isVerifying) {
    return <Loader />;
  }

  // Handle navigation after verification
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
