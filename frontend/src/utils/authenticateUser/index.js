const authenticateUser = async (endpoint, userData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default authenticateUser;
