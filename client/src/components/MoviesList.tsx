import { useEffect, useState } from "react";
import { useSearch } from "../contexts/SearchProvider";

import MovieCardLoader from "./MovieCardLoader";
import API_CONFIG from "../api/config";
import MovieCard from "./MovieCard";

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
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (search.trim().length > 0) params.append("q", search.trim());
        params.append("limit", PAGE_SIZE.toString());
        params.append("offset", offset.toString());

        const url = `${API_CONFIG.baseURL}/movies?${params.toString()}`;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMovies(
          offset === 0 ? data.movies : (prev) => [...prev, ...data.movies]
        );
        setTotal(data.total);
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }
        setError("Failed to load movies. Try again later.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
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
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
          </ul>
          {movies.length < total && (
            <button
              className="btn btn--secondary"
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
