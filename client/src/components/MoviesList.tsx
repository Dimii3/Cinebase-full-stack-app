import { useEffect, useState } from "react";
import { useSearch } from "../contexts/SearchProvider";
import { Link } from "react-router-dom";
import MovieCardLoader from "./MovieCardLoader";
import API_CONFIG from "../api/config";

const PAGE_SIZE = 12;

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
}

export default function MoviesList() {
  const { search } = useSearch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setOffset(0);
  }, [search]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (search.trim().length > 0) params.append("title", search.trim());
        params.append("limit", PAGE_SIZE.toString());
        params.append("offset", offset.toString());

        const url = `${API_CONFIG.baseURL}/movies?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMovies(
          offset === 0 ? data.movies : (prev) => [...prev, ...data.movies]
        );
        setTotal(data.total);
      } catch (error) {
        setError("Failed to load movies. Try again later.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [search, offset]);

  const handleShowMore = () => setOffset((prev) => prev + PAGE_SIZE);

  return (
    <section className="movies-list-container container">
      {isLoading && offset === 0 && (
        <ul className="movies-list">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <MovieCardLoader key={i} />
          ))}
        </ul>
      )}

      {error && <h2>{error}</h2>}

      {!isLoading && !error && movies.length === 0 && <h2>Movies not found</h2>}

      {!error && movies.length > 0 && (
        <>
          <ul className="movies-list">
            {movies.map((movie) => (
              <li key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className="movie-card__image"
                    src={movie.imageUrl}
                    alt={movie.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/image-placeholder.png";
                    }}
                  />
                  <h2 className="movie-card__title">{movie.title}</h2>
                  <p className="movie-card__rating">Rating: {movie.rating}</p>
                </Link>
              </li>
            ))}
          </ul>
          {movies.length < total && (
            <button
              className="show-more-btn"
              onClick={handleShowMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Show more"}
            </button>
          )}
        </>
      )}
    </section>
  );
}
