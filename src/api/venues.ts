import { get } from "./api";
import type { VenuesResponse } from "../types/venue";

export type VenueQueryProps = {
  searchTerm?: string;
};

export const getVenues = async ({
  searchTerm,
}: VenueQueryProps = {}): Promise<VenuesResponse> => {
  const params = new URLSearchParams();
  if (searchTerm) {
    params.append("q", searchTerm);
  }

  const queryString = params.toString();

  const endpoint = queryString
    ? `/holidaze/venues/search?${queryString}`
    : "/holidaze/venues";

  const data = await get<VenuesResponse>(endpoint);

  if (!data) {
    throw new Error("No data received from server");
  }

  return data;
};
