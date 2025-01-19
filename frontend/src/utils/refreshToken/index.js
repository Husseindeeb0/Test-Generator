const refreshTokenFunction = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken")
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      // credentials: "include",
    });

    if (!response.ok) {
      console.log("Something went wrong", response);
    }

    const data = await response.json();

    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    throw error; // Propagate the error for handling
  }
};

export default refreshTokenFunction;
