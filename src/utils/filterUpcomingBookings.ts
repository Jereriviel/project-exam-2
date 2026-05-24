export function filterUpcomingBookings<
  T extends { dateFrom: string; dateTo: string },
>(bookings: T[] = []) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return bookings.filter((booking) => {
    const bookingEndDate = new Date(booking.dateTo);
    bookingEndDate.setHours(0, 0, 0, 0);

    return bookingEndDate >= today;
  });
}
