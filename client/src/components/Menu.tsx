import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";

interface NavItem {
  text: string;
  to?: string;
  isButton?: boolean;
  onClick?: () => void;
  end?: boolean;
}

export default function Menu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const closeMenu = () => setMenuIsOpen(false);

  const baseLinks: NavItem[] = [{ text: "Home", to: "/", end: true }];

  const authLinks: NavItem[] = [
    { text: "Liked", to: "/likedMovies" },
    { text: "Log out", onClick: logout, isButton: true },
  ];

  const guestLinks: NavItem[] = [
    { text: "Log in", to: "/login" },
    { text: "Sign up", to: "/register", isButton: true },
  ];

  const linksToRender = [
    ...baseLinks,
    ...(isAuthenticated ? authLinks : guestLinks),
  ];

  return (
    <nav className={`nav container ${menuIsOpen ? "nav--active" : ""}`}>
      <NavLink to="/" className="nav__logo" onClick={closeMenu}>
        Cinebase.
      </NavLink>
      <button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className={`nav__btn ${menuIsOpen ? "nav__btn--active" : ""}`}
        aria-label="Toggle navigation menu"
      >
        <div className="nav__btn-bar"></div>
        <div className="nav__btn-bar"></div>
        <div className="nav__btn-bar"></div>
      </button>
      <ul className="nav__list">
        {linksToRender.map((link) => {
          const handleClick = () => {
            closeMenu();
            if (link.onClick) {
              link.onClick();
            }
          };

          const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
            `nav__link ${isActive ? "nav__link--active" : ""} ${
              link.isButton ? "btn btn--primary" : ""
            }`;

          return (
            <li key={link.text} className="nav__list-item">
              {link.to ? (
                <NavLink
                  to={link.to}
                  className={getNavLinkClass}
                  onClick={handleClick}
                  end={link.end}
                >
                  {link.text}
                </NavLink>
              ) : (
                <button
                  onClick={handleClick}
                  className="nav__link btn btn--primary"
                >
                  {link.text}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
