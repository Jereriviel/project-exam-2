import { get } from "./api";
import type { VenuesResponse } from "../types/venue";

export const getAllVenues = async (): Promise<VenuesResponse> => {
  const data = await get<VenuesResponse>("/holidaze/venues");

  if (!data) {
    throw new Error("No data received from server");
  }

  return data ?? [];
};
