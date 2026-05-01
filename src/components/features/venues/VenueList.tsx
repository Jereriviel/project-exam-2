import VenueCard from "./VenueCard";
import type { Venue } from "../../../types/venue";
import { useVenues } from "../../../hooks/useVenues";

const VenueList = () => {
  const { data: response, isLoading, isError, error } = useVenues();

  if (isLoading) {
    return <div>Loading skeleton to be added</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!response || response.data.length === 0) {
    return <div className="py-10 text-center">No venues found.</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {response.data.map((venue: Venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};

export default VenueList;
