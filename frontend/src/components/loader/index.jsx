import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import { GlobalContext } from "../../context";

function Loader() {
  const { loading } = useContext(GlobalContext);
  const location = useLocation();
  const [navLoader, setNavLoader] = useState(false);

  // When the route changes, trigger the nav loader only if global loading is true
  useEffect(() => {
    setNavLoader(true);
    const intervalId = setInterval(() => {
      if (!loading) {
        setNavLoader(false);
        clearInterval(intervalId);
      }
    }, 2000);
  
    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <>
      {navLoader && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-slate-800 z-50">
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#10b981"
            ariaLabel="puff-loading"
          />
        </div>
      )}
    </>
  );
}

export default Loader;
