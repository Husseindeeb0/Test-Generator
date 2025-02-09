const deleteTest = async (testId, accessToken, fetchTests, setLoading) => {
  try {
    setLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tests/delete/${testId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      await fetchTests()
      setLoading(false)
      return true;
    } else {
      console.log(result.error)
      setLoading(false)
    }

  } catch (error) {
    console.log(error);
    setLoading(false)
  }
};

export default deleteTest;
