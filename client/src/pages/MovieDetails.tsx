import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API_CONFIG from "../api/config";
import MovieCardLoader from "../components/MovieCardLoader";

interface MovieDetailsProps {
  id: string;
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

  useEffect(() => {
    if (!id) return;
    fetch(API_CONFIG.endpoints.movieDetails(id))
      .then((res) => res.json())
      .then(setMovie);
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
            </div>
          </>
        )}
      </div>
    </section>
  );
}
