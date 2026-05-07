import { useSearchParams } from "react-router-dom";
import VenueList from "../venues/VenueList";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="w-full">
      <VenueList searchTerm={query} />
    </div>
  );
}

export default SearchResults;
