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
      className="flex w-full gap-0.5 rounded-xl bg-white"
    >
      <div className="relative flex w-full items-center">
        <span className="iconify-[material-symbols--search] text-gray-dark absolute top-1/2 left-2 hidden -translate-y-1/2 sm:flex md:left-2"></span>
        <Input
          className="w-full rounded-xl border-none px-4 py-2 sm:px-8"
          placeholder="Search for venues"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
      </div>
      <button type="submit" className="btn-secondary hidden sm:flex">
        Search
      </button>
      <button type="submit" className="btn-search-mobile shrink-0 sm:hidden">
        <span className="iconify-[material-symbols--search] text-primary font"></span>
      </button>
    </Field>
  );
}

export default SearchBar;
