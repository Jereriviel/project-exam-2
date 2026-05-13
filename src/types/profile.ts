import type { Media } from "./media";
import type { VenueMeta, VenueLocation } from "./venue";

export interface Profile {
  name: string;
  email: string;
  bio?: string;
  avatar: Media;
  banner: Media;
  venueManager: boolean;
  venues?: ProfileVenueSummary[];
  bookings?: ProfileBooking[];
  _count: ProfileCounts;
}

export interface ProfileResponse {
  data: Profile;
  meta: Record<string, unknown>;
}

export interface UpdateProfileRequest {
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager?: boolean;
}

export interface ProfileVenueSummary {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
}

export interface ProfileVenuesResponse {
  data: ProfileVenueSummary[];
  meta: Record<string, unknown>;
}

export interface ProfileBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: ProfileVenueSummary;
}

export interface ProfileBookingsResponse {
  data: ProfileBooking[];
  meta: Record<string, unknown>;
}

export interface ProfileCounts {
  venues: number;
  bookings: number;
}
