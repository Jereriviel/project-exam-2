import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import VenueCard from "./VenueCard";
import type { Venue } from "../../../types/venue";
import { useVenues } from "../../../hooks/useVenues";
import VenueCardSkeleton from "./VenueCardSkeleton";
import VenuePagination from "../../ui/Pagination";
import VenueSortSelect from "./VenueSortSelect";

type VenueListProps = {
  searchTerm?: string;
};

const VenueList = ({ searchTerm }: VenueListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 12;
  const sortField = searchParams.get("sort") || undefined;
  const sortOrder =
    (searchParams.get("sortOrder") as "asc" | "desc") || undefined;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, searchTerm, sortField, sortOrder]);

  const updateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    if (value === "all-venues") {
      updateParams({ page: "1", sort: "", sortOrder: "" });
    } else {
      const [field, order] = value.split("-");
      updateParams({ page: "1", sort: field, sortOrder: order });
    }
  };

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useVenues(searchTerm, currentPage, limit, sortField, sortOrder);

  const currentSortValue = sortField
    ? `${sortField}-${sortOrder}`
    : "all-venues";

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
      <VenueSortSelect
        currentValue={currentSortValue}
        onChange={handleSortChange}
      />
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
          onPageChange={(page) => updateParams({ page: page.toString() })}
        />
      )}
    </div>
  );
};

export default VenueList;
