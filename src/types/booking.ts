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
