import type { ProfileVenueSummary } from "./profile";
import type { Profile } from "./profile";

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: ProfileVenueSummary;
  customer?: Profile;
}

export interface SingleBookingResponse {
  data: Booking;
  meta: Record<string, unknown>;
}

export interface BookingsResponse {
  data: Booking[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

export interface CreateBookingRequest {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export interface UpdateBookingRequest {
  dateFrom?: string;
  dateTo?: string;
  guests?: number;
}
