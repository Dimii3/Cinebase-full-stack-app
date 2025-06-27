import { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchProvider";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const { setSearch } = useSearch();

  useEffect(() => {
    if (value.includes("<") || value.includes(">")) return;
    if (typeof value !== "string") return;

    const handler = setTimeout(() => {
      setSearch(value);
    }, 400);

    return () => clearTimeout(handler);
  }, [value, setSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-bar__input input"
        type="text"
        placeholder="Search Movie..."
        value={value}
        onChange={handleChange}
      />
    </form>
  );
}
