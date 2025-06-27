import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import { SearchProvider } from "./contexts/SearchProvider";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./components/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import Preloader from "./components/Preloader";

const Home = lazy(() => import("./pages/Home"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LikedMoviesPage = lazy(() => import("./pages/LikedMoviesPage"));

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <ScrollToTop />
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route element={<PrivateRoute />}>
                <Route path="/likedMovies" element={<LikedMoviesPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer aria-label="Notification" />
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
