import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { SearchProvider } from "./contexts/SearchProvider";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <SearchProvider>
        <Menu></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/register/" element={<Register />} />
          </Routes>
        </main>
      </SearchProvider>
      <ToastContainer aria-label="Notification" />
      <Footer></Footer>
    </>
  );
}

export default App;
