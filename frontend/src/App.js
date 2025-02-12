import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Generator from "./pages/generator";
import Test from "./pages/test";
import Context from "./context";
import Main from "./pages/main";
import ManualTests from "./pages/manualTests";
import Loader from "./components/loader";
import Nav from "./components/navbar";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Results from "./pages/results";
import ProtectedRoutes from "./components/protectedRoutes";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <Context>
      <HashRouter>
        <ScrollToTop />
        <Nav />
        <Loader />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes Group */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/manualtests" element={<ManualTests />} />
            <Route path="/test" element={<Test />} />
            <Route path="/results" element={<Results />} />
          </Route>
        </Routes>
      </HashRouter>
    </Context>
  );
}

export default App;
