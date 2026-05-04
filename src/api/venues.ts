import { get } from "./api";
import type { VenuesResponse } from "../types/venue";

export type VenueQueryProps = {
  searchTerm?: string;
  page?: number;
  limit?: number;
};

export const getVenues = async ({
  searchTerm,
  page = 1,
  limit = 12,
}: VenueQueryProps = {}): Promise<VenuesResponse> => {
  const params = new URLSearchParams();

  if (searchTerm) {
    params.append("q", searchTerm);
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const queryString = params.toString();

  const endpoint = searchTerm
    ? `/holidaze/venues/search?${queryString}`
    : `/holidaze/venues?${queryString}`;

  const data = await get<VenuesResponse>(endpoint);

  if (!data) {
    throw new Error("No data received from server");
  }

  return data;
};
