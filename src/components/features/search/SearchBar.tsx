import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Input } from "@headlessui/react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Field
      as="form"
      onSubmit={handleSearch}
      className="flex w-full items-center gap-0.5 rounded-full bg-white md:max-w-2xl"
    >
      <div className="relative flex w-full items-center">
        <Input
          className="w-full rounded-full border-none px-4 py-2"
          placeholder="Search for venues"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
      </div>
      <button type="submit" aria-label="Search" className="btn-search shrink-0">
        <span className="iconify-[material-symbols--search] text-white"></span>
      </button>
    </Field>
  );
}

export default SearchBar;
