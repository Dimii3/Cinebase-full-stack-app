const footerColumns = [
  {
    title: "Contact & Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Suggest a Movie", href: "#" },
      { name: "Report a Problem", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "DMCA", href: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { name: "Instagram", href: "#" },
      { name: "Twitter / X", href: "#" },
      { name: "YouTube", href: "#" },
      { name: "TikTok", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-col">
          <h3 className="footer-col__heading">Cinebase</h3>
          <p className="footer-col__text">
            Discover, rate, and review movies with Cinebase. Join a growing
            community of film lovers and find your next favorite movie today.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div className="footer-col" key={column.title}>
            <h3 className="footer-col__heading">{column.title}</h3>
            <ul className="footer-col__list">
              {column.links.map((link) => (
                <li className="footer-col__item" key={link.name}>
                  <a className="footer-col__link" href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
