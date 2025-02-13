import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Puff } from "react-loader-spinner";

function Loader() {
  const location = useLocation(); // Detect route changes
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    // Show loader when the location changes
    setLoading(true);

    // Wait for the full page load
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      // If page is already loaded, remove loader immediately
      setLoading(false);
    } else {
      // Otherwise, wait for the window load event
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [location]);

  return (
    <>
      {loading && (
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
