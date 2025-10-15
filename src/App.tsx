import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
