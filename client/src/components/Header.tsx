import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container container">
        <h1 className="header__heading">
          Find the best movies to watch tonight
        </h1>
        <p className="header__description">
          Write honest reviews, track what you’ve watched, and get personalized
          recommendations from real users.
        </p>
        <SearchBar></SearchBar>
      </div>
    </header>
  );
}
