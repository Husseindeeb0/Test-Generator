const deleteTest = async (endpoint) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return true;
    }

  } catch (error) {
    console.log(error);
  }
};

export default deleteTest;
