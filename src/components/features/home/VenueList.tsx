import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import VenueCard from "../venues/VenueCard";
import type { Venue } from "../../../types/venue";
import { useVenues } from "../../../hooks/useVenues";
import VenueCardSkeleton from "../venues/VenueCardSkeleton";
import VenuePagination from "../../ui/Pagination";

type VenueListProps = {
  searchTerm?: string;
};

const VenueList = ({ searchTerm }: VenueListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 12;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useVenues(searchTerm, currentPage, limit);

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
    <div className="flex flex-col gap-4">
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
      {response?.meta && response.meta.pageCount > 1 && (
        <VenuePagination
          currentPage={response.meta.currentPage}
          pageCount={response.meta.pageCount}
          onPageChange={(page) => handlePageChange(page)}
        />
      )}
    </div>
  );
};

export default VenueList;
