import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { SearchProvider } from "./contexts/SearchProvider";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <>
      <SearchProvider>
        <Menu></Menu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </SearchProvider>
      <Footer></Footer>
    </>
  );
}

export default App;
