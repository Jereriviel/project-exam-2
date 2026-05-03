import VenueCard from "../venues/VenueCard";
import type { Venue } from "../../../types/venue";
import { useVenues } from "../../../hooks/useVenues";
import VenueCardSkeleton from "../venues/VenueCardSkeleton";

type VenueListProps = {
  searchTerm?: string;
};

const VenueList = ({ searchTerm }: VenueListProps) => {
  const { data: response, isLoading, isError, error } = useVenues(searchTerm);

  if (isError) {
    return (
      <div className="flex flex-col gap-2 font-medium">
        <p>Oops!</p>
        <p>{error.message}.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!isLoading && (!response || response.data.length === 0)) {
    return (
      <div>
        <p className="font-medium">No venues found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="fade-in">
              <VenueCardSkeleton />
            </div>
          ))
        : response?.data.map((venue: Venue) => (
            <div key={venue.id} className="fade-in">
              <VenueCard venue={venue} />
            </div>
          ))}
    </div>
  );
};

export default VenueList;
