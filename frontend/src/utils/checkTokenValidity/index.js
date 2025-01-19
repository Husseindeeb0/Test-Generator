const checkTokenValidity = async (accessToken) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verifyJWT`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Send token in Authorization header
      },
    });

    if (!response.ok) {
      throw new Error("Failed to verify token");
    }

    const data = await response.json();

    if (data?.message) {
      console.log(data.message)
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

export default checkTokenValidity;
