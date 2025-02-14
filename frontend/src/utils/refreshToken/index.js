const refreshTokenFunction = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken")
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    if (!response.ok || !data) {
      console.log("Error:", data.message);
    }

    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    throw error; // Propagate the error for handling
  }
};

export default refreshTokenFunction;
