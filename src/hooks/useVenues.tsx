import { useQuery } from "@tanstack/react-query";
import { getVenues } from "../api/venues";

export const useVenues = (
  searchTerm?: string,
  page: number = 1,
  limit: number = 12,
  sort?: string,
  sortOrder?: "asc" | "desc",
) => {
  return useQuery({
    queryKey: ["venues", { searchTerm, page, limit, sort, sortOrder }],
    queryFn: () =>
      getVenues({
        searchTerm,
        page,
        limit,
        sort,
        sortOrder,
      }),
  });
};
