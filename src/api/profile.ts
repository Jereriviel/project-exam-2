import { get, put } from "./api";
import type {
  Profile,
  ProfileResponse,
  ProfileVenuesResponse,
  ProfileBookingsResponse,
  UpdateProfileRequest,
} from "../types/profile";

export const getProfileById = async (
  id: string,
  token: string | null = null,
): Promise<Profile> => {
  const endpoint = `/holidaze/profiles/${id}?_bookings=true&_venues=true`;
  const response = await get<ProfileResponse>(endpoint, token);

  if (!response?.data) {
    throw new Error("No data received from server");
  }

  return response.data;
};

export const updateProfile = async (
  id: string,
  putData: UpdateProfileRequest,
  token: string | null = null,
): Promise<Profile> => {
  const endpoint = `/holidaze/profiles/${id}`;
  const response = await put<{ data: Profile }>(endpoint, putData, token);

  if (!response?.data) throw new Error("Profile was not updated.");

  return response?.data;
};

export const getBookingsByProfile = async (
  id: string,
): Promise<ProfileBookingsResponse> => {
  const endpoint = `/holidaze/profiles/${id}/bookings`;
  const data = await get<ProfileBookingsResponse>(endpoint);

  if (!data) {
    throw new Error("No data received from server");
  }

  return data;
};

export const getVenuesByProfile = async (
  id: string,
  token: string | null = null,
): Promise<ProfileVenuesResponse> => {
  const endpoint = `/holidaze/profiles/${id}/venues?_bookings=true`;
  const data = await get<ProfileVenuesResponse>(endpoint, token);

  if (!data) {
    throw new Error("No data received from server");
  }

  return data;
};
