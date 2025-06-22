import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Menu() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav__link ${isActive ? "nav__link--active" : ""}`;

  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="nav container">
      <NavLink to="/" className="nav__logo">
        Cinebase.
      </NavLink>
      <ul className="nav__list">
        <li className="nav__list-item">
          <NavLink to="/" className={getNavLinkClass} end>
            Home
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li className="nav__list-item">
              <NavLink to="/likedMovies" className={getNavLinkClass}>
                Liked
              </NavLink>
            </li>
            <li className="nav__list-item">
              <button onClick={logout} className="nav__link  btn btn--primary">
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav__list-item">
              <NavLink to="/login" className={getNavLinkClass}>
                Log in
              </NavLink>
            </li>
            <li className="nav__list-item ">
              <NavLink to="/register" className="nav__link  btn btn--primary ">
                Sign up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
