import { get, post, put, del } from "./api";
import type {
  VenuesResponse,
  Venue,
  SingleVenueResponse,
} from "../types/venue";
import type {
  CreateVenueRequest,
  UpdateVenueRequest,
} from "../components/features/venues/venue.schema";

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
  const endpoint = `/holidaze/venues/${id}?_owner=true&_bookings=true`;
  const response = await get<SingleVenueResponse>(endpoint);

  if (!response || !response.data) {
    throw new Error("Venue not found");
  }

  return response.data;
};

export const createVenue = async (
  postData: CreateVenueRequest,
  token: string | null = null,
): Promise<Venue> => {
  const endpoint = `/holidaze/venues`;
  const response = await post<{ data: Venue }>(endpoint, postData, token);

  if (!response?.data) throw new Error("Venue was not created");

  return response.data;
};

export const updateVenue = async (
  id: string,
  putData: UpdateVenueRequest,
  token: string | null = null,
): Promise<Venue> => {
  const endpoint = `/holidaze/venues/${id}`;
  const response = await put<{ data: Venue }>(endpoint, putData, token);

  if (!response?.data) throw new Error("Venue was not updated");

  return response.data;
};

export const deleteVenue = async (
  id: string,
  token: string | null = null,
): Promise<void> => {
  await del(`/holidaze/venues/${id}`, token);
};
