import { useQuery } from "@tanstack/react-query";
import { getVenues } from "../api/venues";

export const useVenues = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["venues", searchTerm],
    queryFn: () => getVenues({ searchTerm }),
  });
};
