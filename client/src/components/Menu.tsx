import { NavLink } from "react-router-dom";

export default function Menu() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav__link ${isActive ? "nav__link--active" : ""}`;

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
        <li className="nav__list-item">
          <NavLink to="/liked" className={getNavLinkClass}>
            Liked
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to="/login" className={getNavLinkClass}>
            Log in
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to="/signup" className="nav__link nav__link--button">
            Sign up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
