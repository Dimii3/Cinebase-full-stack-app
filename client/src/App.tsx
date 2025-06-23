import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { SearchProvider } from "./contexts/SearchProvider";
import MovieDetails from "./pages/MovieDetails";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthProvider";
import LikedMoviesPage from "./pages/LikedMoviesPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <ScrollToTop />
          <Menu></Menu>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/register/" element={<RegisterPage />} />
              <Route path="/login/" element={<LoginPage />} />
              <Route path="/likedMovies/" element={<LikedMoviesPage />} />
            </Routes>
          </main>
        </SearchProvider>
      </AuthProvider>
      <ToastContainer aria-label="Notification" />
      <Footer></Footer>
    </>
  );
}

export default App;
