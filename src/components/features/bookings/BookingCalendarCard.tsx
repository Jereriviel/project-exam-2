import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Booking } from "../../../types/booking";
import type { ProfileVenueSummary } from "../../../types/profile";
import { BookingCalendar } from "./BookingCalendar";
import BookingTotalNights from "./BookingTotalNights";
import GuestSelector from "./GuestSelector";

interface BookingCalendarCardProps {
  booking?: Booking;
  venue: ProfileVenueSummary;
}

const BookingCalendarCard = ({ booking, venue }: BookingCalendarCardProps) => {
  const [selectedGuests, setSelectedGuests] = useState(booking?.guests ?? 1);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: booking?.dateFrom ? new Date(booking.dateFrom) : undefined,
    to: booking?.dateTo ? new Date(booking.dateTo) : undefined,
  });

  return (
    <div className="flex w-fit flex-col gap-4 rounded-xl bg-white p-4 shadow-lg sm:p-8">
      <BookingCalendar
        selected={dateRange}
        onDateChange={(range) => {
          if (range) {
            setDateRange(range);
          }
        }}
      />
      <GuestSelector
        guests={selectedGuests}
        maxGuests={venue?.maxGuests}
        onChange={(count) => setSelectedGuests(count)}
      />
      <BookingTotalNights dateRange={dateRange} pricePerNight={venue?.price} />
      <button className="btn-primary min-w-full">Book Now</button>
    </div>
  );
};

export default BookingCalendarCard;
