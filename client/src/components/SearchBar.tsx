import { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchProvider";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const { setSearch } = useSearch();

  useEffect(() => {
    if (value.includes("<") || value.includes(">")) {
      setValue(value.replace(/<[^>]*>/g, ""));
      return;
    }

    if (typeof value !== "string") return;

    const handler = setTimeout(() => {
      setSearch(value.trim());
    }, 400);

    return () => clearTimeout(handler);
  }, [value, setSearch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search Movie..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="search-bar__btn" type="submit">
        Search
      </button>
    </form>
  );
}
