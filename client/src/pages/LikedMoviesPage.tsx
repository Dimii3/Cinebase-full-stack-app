import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import API_CONFIG from "../api/config";
import MovieCard from "../components/MovieCard";
import MovieCardLoader from "../components/MovieCardLoader";

interface Movie {
  id: number;
  title: string;
  poster: string;
  imageUrl: string;
  description: string;
  rating: number;
}

export default function LikedMoviesPage() {
  const { user } = useAuth();

  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (!user || user.likedMovies.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_CONFIG.endpoints.likedMovies, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: user.likedMovies }),
        });

        const data = await response.json();
        if (response.ok) {
          setLikedMovies(data.movies);
        } else {
          throw new Error(data.message || "Failed to fetch liked movies");
        }
      } catch (error) {
        console.error("Error fetching liked movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedMovies();
  }, [user]);

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: user?.likedMovies.length || 4 }).map(
        (_, index) => <MovieCardLoader key={index} />
      );
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
