import { useState, useContext } from "react";
import authenticateUser from "../../utils/authenticateUser";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";

const Signup = () => {
  const { setAccessToken } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userData = { email, password };
      const data = await authenticateUser("register", userData); // "register" is the signup endpoint
      if (data?.status === "success" && data.refreshToken && data.accessToken) {
        console.log("User registered:", data);
        localStorage.setItem("refreshToken", data.refreshToken);
        setAccessToken(data.accessToken);
        navigate("/home");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-5">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-32 bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Sign Up
        </h1>
        <p className="text-sm text-center text-gray-600">
          Create an account to enjoy our services.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
        />

        {error && (
          <div className="text-sm text-red-500 bg-red-100 p-2 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white rounded-md ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
