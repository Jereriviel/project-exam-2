import { get } from "./api";
import type {
  VenuesResponse,
  Venue,
  SingleVenueResponse,
} from "../types/venue";

export type VenueQueryProps = {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: "asc" | "desc";
};

export const getVenues = async ({
  page = 1,
  limit = 12,
  searchTerm = "",
  sort,
  sortOrder = "desc",
}: VenueQueryProps = {}): Promise<VenuesResponse> => {
  const params = new URLSearchParams();

  if (searchTerm) {
    params.append("q", searchTerm);
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (sort) params.append("sort", sort);
  if (sortOrder) params.append("sortOrder", sortOrder);

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

export const getVenueById = async (id: string): Promise<Venue> => {
  const endpoint = `/holidaze/venues/${id}`;
  const response = await get<SingleVenueResponse>(endpoint);

  if (!response || !response.data) {
    throw new Error("Venue not found");
  }

  return response.data;
};
