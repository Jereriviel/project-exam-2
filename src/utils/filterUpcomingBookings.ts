import type { Booking } from "../types/booking";

export function filterUpcomingBookings(bookings: Booking[] = []) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return bookings.filter((booking) => {
    const bookingEndDate = new Date(booking.dateTo);

    bookingEndDate.setHours(0, 0, 0, 0);

    return bookingEndDate >= today;
  });
}
