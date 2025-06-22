import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import API_CONFIG from "../api/config";
import MovieCard from "../components/MovieCard";
import MovieCardLoader from "../components/MovieCardLoader";

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  rating: number;
}

export default function LikedMoviesPage() {
  const { user } = useAuth();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch(API_CONFIG.endpoints.movies);
        const data = await response.json();
        if (response.ok) {
          setAllMovies(data.movies);
        } else {
          throw new Error(data.message || "Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const likedMovies = allMovies.filter((movie) =>
    user?.likedMovies.includes(movie.id)
  );

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <MovieCardLoader key={index} />
      ));
    }

    if (likedMovies.length === 0) {
      return (
        <p className="liked-movies__empty">You haven't liked any movies yet.</p>
      );
    }

    return likedMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  };

  return (
    <section className="liked-movies container liked-movies-container">
      <h1 className="liked-movies__heading heading-1">The movies you like</h1>
      <p className="liked-movies__description">
        Here’s a space for the movies that made you laugh, think, or dream — the
        ones that always stay with you.
      </p>

      <ul className="movies-list">{renderContent()}</ul>
    </section>
  );
}
