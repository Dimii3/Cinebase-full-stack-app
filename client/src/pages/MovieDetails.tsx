import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API_CONFIG from "../api/config";
import MovieCardLoader from "../components/MovieCardLoader";
import { useAuth } from "../contexts/AuthProvider";

interface MovieDetailsProps {
  id: number;
  title: string;
  imageUrl: string;
  summary: string;
  year: string;
  rating: number;
  genre: string;
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);
  const { isAuthenticated, user, toggleLikeMovie } = useAuth();

  useEffect(() => {
    const getMovieDetails = async () => {
      setMovie(null);
      if (!id) return;
      try {
        const response = await fetch(API_CONFIG.endpoints.movieDetails(id));
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [id]);

  return (
    <section className="container movie-details-container">
      <div className="movie-details">
        {!movie ? (
          <MovieCardLoader />
        ) : (
          <>
            <img
              className="movie-details__image"
              src={movie.imageUrl}
              alt={movie.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/image-placeholder.png";
              }}
            />
            <div className="movie-details__info">
              <h1 className="movie-details__title">{movie.title}</h1>
              <p className="movie-details__description">{movie.summary}</p>
              <p className="movie-details__release-date">
                Release Date: {movie.year}
              </p>
              <p className="movie-details__genre">Genre: {movie.genre}</p>
              <p className="movie-details__rating">Rating: {movie.rating}/10</p>
              {isAuthenticated &&
                (() => {
                  const isLiked = user?.likedMovies.includes(movie.id) ?? false;
                  const handleLikeClick = () => toggleLikeMovie(movie.id);

                  return (
                    <button
                      className={`movie-details__btn btn ${
                        isLiked ? "btn--secondary" : "btn--primary"
                      }`}
                      onClick={handleLikeClick}
                    >
                      {isLiked ? "Unlike" : "Like"}
                    </button>
                  );
                })()}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
