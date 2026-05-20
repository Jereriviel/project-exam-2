import { differenceInCalendarDays, parseISO } from "date-fns";

export function calculateNights(dateFrom: string, dateTo: string) {
  return differenceInCalendarDays(parseISO(dateTo), parseISO(dateFrom));
}
