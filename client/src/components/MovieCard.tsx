import { Link } from "react-router-dom";

export default function MovieCard({
  movie,
}: {
  movie: { id: number; title: string; imageUrl: string; rating: number };
}) {
  return (
    <li key={movie.id} className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          className="movie-card__image"
          src={movie.imageUrl}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/image-placeholder.png";
          }}
        />
        <div className="movie-card__info">
          <h2 className="movie-card__title">{movie.title}</h2>
          <p className="movie-card__rating">Rating: {movie.rating}</p>
        </div>
      </Link>
    </li>
  );
}
