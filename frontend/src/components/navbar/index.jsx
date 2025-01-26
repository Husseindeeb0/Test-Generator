import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { GlobalContext } from "../../context";

function Nav() {
  const { isAuthenticated, setAccessToken } = useContext(GlobalContext);
  // State to manage the open/closed state of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = async () => {
    try {
      // Clear localStorage and in-memory variables
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Main navigation bar */}
      <nav className="flex w-screen h-16 bg-white text-black justify-between items-center px-5 md:px-10">
        {/* Logo and home link */}
        <div className="text-2xl md:text-4xl font-semibold">
          <Link to={"/"}>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              className="w-60"
              alt="Logo"
            />
          </Link>
        </div>
        {/* Icon to toggle sidebar on small screens */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaBars />
        </div>
        {/* Navigation links for larger screens */}
        <div className="hidden md:flex items-center gap-5 md:gap-7 text-lg md:text-xl">
          {isAuthenticated && (
            <>
              <Link className="hover:text-emerald-500" to={"/home"}>
                Home
              </Link>
              <Link
                className="hover:text-emerald-500"
                to={"/generator"}
                title="Manual test generating"
              >
                Generate
              </Link>
              <Link className="hover:text-emerald-500" to={"/manualtests"}>
                Manual Tests
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <div
              className="hover:bg-white transition hover:text-black border-2 border-transparent hover:border-black text-white px-4 py-1 bg-blue-900 rounded-full cursor-pointer"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </div>
          ) : (
            <>
              <Link
                className="hover:text-emerald-500 font-semibold"
                to={"/login"}
              >
                LogIn
              </Link>
              <Link
                className="hover:bg-white transition hover:text-black border-2 border-transparent hover:border-black text-white px-4 py-1 bg-blue-900 rounded-full"
                to={"/signup"}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 left-0 w-64 h-full z-10 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex items-center justify-between p-5">
          {/* Title and close button for the sidebar */}
          <span className="text-2xl font-semibold">Menu</span>
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <div className="flex flex-col gap-5 text-lg p-5">
          {/* Sidebar navigation links */}
          {isAuthenticated && (
            <>
              <Link
                className="hover:text-emerald-500"
                to={"/home"}
                onClick={toggleSidebar} // Close sidebar on link click
              >
                Home
              </Link>
              <Link
                className="hover:text-emerald-500"
                to={"/generator"}
                onClick={toggleSidebar}
              >
                Generate
              </Link>
              <Link
                className="hover:text-emerald-500"
                to={"/manualtests"}
                onClick={toggleSidebar}
              >
                Manual Tests
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <div
              className="hover:bg-white transition-all ease-linear duration-100 hover:text-black border-2 border-transparent hover:border-black text-white px-4 py-1 text-center bg-blue-900 rounded-full cursor-pointer"
              onClick={() => {
                logout();
                toggleSidebar();
              }}
            >
              Logout
            </div>
          ) : (
            <>
              <Link
                className="hover:text-emerald-500 font-semibold"
                to={"/login"}
                onClick={toggleSidebar}
              >
                LogIn
              </Link>
              <Link
                className="hover:bg-white transition-all ease-linear duration-100 hover:text-black border-2 border-transparent hover:border-black text-white px-4 py-1 text-center bg-blue-900 rounded-full"
                to={"/signup"}
                onClick={toggleSidebar}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Overlay to dim the background when the sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Nav;
