import { useQuery } from "@tanstack/react-query";
import { getVenues } from "../api/venues";

export const useVenues = (
  searchTerm?: string,
  page: number = 1,
  limit: number = 12,
) => {
  return useQuery({
    queryKey: ["venues", { searchTerm, page, limit }],
    queryFn: () => getVenues({ searchTerm, page, limit }),
  });
};
