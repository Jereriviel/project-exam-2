import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Booking, CreateBookingRequest } from "../../../types/booking";
import type { Venue } from "../../../types/venue";
import { BookingCalendar } from "./BookingCalendar";
import BookingTotalNights from "./BookingTotalNights";
import GuestSelector from "./GuestSelector";
import { useAuth } from "../../../hooks/useAuth";
import { useCreateBooking } from "../../../hooks/useCreateBooking";
import { ShowSuccessToast, ShowFailToast } from "../../ui/Toast/Toast";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { parseISO, startOfDay, format } from "date-fns";
import { useMemo } from "react";

interface BookingCalendarCardProps {
  booking?: Booking;
  venue: Venue;
}

const BookingCalendarCard = ({ booking, venue }: BookingCalendarCardProps) => {
  const [selectedGuests, setSelectedGuests] = useState(booking?.guests ?? 1);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: booking?.dateFrom ? new Date(booking.dateFrom) : undefined,
    to: booking?.dateTo ? new Date(booking.dateTo) : undefined,
  });

  const blockedDates = useMemo(() => {
    return (
      venue.bookings?.map((b) => ({
        from: startOfDay(parseISO(b.dateFrom)),
        to: startOfDay(parseISO(b.dateTo)),
      })) ?? []
    );
  }, [venue.bookings]);

  const createBookingMutation = useCreateBooking();
  const { token } = useAuth();

  const isBookingDisabled =
    !dateRange.from || !dateRange.to || createBookingMutation.isPending;

  const handleBooking = async () => {
    if (!token) {
      ShowFailToast("You must be logged in to book a venue");
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      ShowFailToast("Please select both start and end dates");
      return;
    }

    const bookingData: CreateBookingRequest = {
      venueId: venue.id,
      dateFrom: format(dateRange.from, "yyyy-MM-dd"),
      dateTo: format(dateRange.to, "yyyy-MM-dd"),
      guests: selectedGuests,
    };

    createBookingMutation.mutate(
      { data: bookingData, token },
      {
        onSuccess: () => {
          ShowSuccessToast("Booking successful");

          setDateRange({
            from: undefined,
            to: undefined,
          });
        },
        onError: (error) => {
          ShowFailToast(`Booking failed: ${error.message}`);
        },
      },
    );
  };

  return (
    <div className="flex w-fit flex-col gap-4 rounded-xl bg-white p-4 shadow-lg sm:p-8">
      <BookingCalendar
        selected={dateRange}
        onDateChange={(range) => {
          if (range) {
            setDateRange(range);
          }
        }}
        disabledDates={blockedDates}
      />
      <GuestSelector
        guests={selectedGuests}
        maxGuests={venue?.maxGuests}
        onChange={(count) => setSelectedGuests(count)}
      />
      <BookingTotalNights dateRange={dateRange} pricePerNight={venue?.price} />
      <button
        className="btn-primary flex h-12 min-w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleBooking}
        disabled={isBookingDisabled}
      >
        {createBookingMutation.isPending ? <LoadingSpinner /> : "Book Now"}
      </button>
    </div>
  );
};

export default BookingCalendarCard;
