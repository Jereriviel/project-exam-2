import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "../api/venues";
import type { VenuesResponse } from "../types/venue";

export const useVenues = () => {
  return useQuery<VenuesResponse, Error>({
    queryKey: ["venues"],
    queryFn: () => getAllVenues(),
  });
};
