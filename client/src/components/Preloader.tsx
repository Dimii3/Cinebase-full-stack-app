import { useState, useEffect } from "react";

const PRELOADER_DELAY = 300;

export default function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, PRELOADER_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return show ? (
    <div className="preloader-container">
      <h1 className="preloader__heading">Cinebase</h1>
      <div className="progress-bar">
        <div className="progress-bar__inner"></div>
      </div>
    </div>
  ) : null;
}
