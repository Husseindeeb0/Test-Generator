import checkTokenValidity from "../checkTokenValidity";
import refreshTokenFunction from "../refreshToken";

const verifyRefreshAuth = async (accessToken, refreshToken, setAccessToken) => {
  try {
    // Check if access token is valid
    const isValid = accessToken
      ? await checkTokenValidity(accessToken)
      : false;

    if (!isValid && refreshToken) {
      // Refresh the token if invalid
      const newAccessToken = await refreshTokenFunction();
      if (newAccessToken) {
        setAccessToken(newAccessToken); // Update access token
        return true; // Auth successful
      }
      return false; // Auth failed
    }

    return isValid; // Return true if token is valid
  } catch (error) {
    console.error("Error in verifyAndRefreshAuth:", error);
    return false;
  }
};

export default verifyRefreshAuth;
