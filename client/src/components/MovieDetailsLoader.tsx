import MovieCardLoader from "./MovieCardLoader";

export default function MovieDetailsLoader() {
  return (
    <>
      <MovieCardLoader />
      <div className="movie-details__info details-loader">
        <div className="details-loader__title"></div>
        <div className="details-loader__description"></div>
        <div className="details-loader__rating"></div>
      </div>
    </>
  );
}
