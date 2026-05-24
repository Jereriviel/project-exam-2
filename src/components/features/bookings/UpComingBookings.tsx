import UpcomingBookingCard from "./UpComingBookingCard";
import type { Booking } from "../../../types/booking";
import { filterUpcomingBookings } from "../../../utils/filterUpcomingBookings";

interface UpcomingBookingsProps {
  bookings: Booking[];
  venuePrice: number;
  onEditClick: () => void;
}

const UpcomingBookings = ({
  bookings,
  venuePrice,
  onEditClick,
}: UpcomingBookingsProps) => {
  const upcomingBookings = filterUpcomingBookings(bookings);

  if (upcomingBookings.length === 0) {
    return (
      <section className="flex flex-col gap-4 lg:gap-6">
        <div className="flex w-full justify-end">
          <button
            aria-label="Edit Venue"
            type="button"
            className="btn-primary flex items-center justify-center gap-2"
            onClick={onEditClick}
          >
            <span className="iconify-[material-symbols--edit-outline]"></span>
            <span>Edit Venue</span>
          </button>
        </div>
        <h2 className="text-xl md:text-2xl">Upcoming Bookings (0)</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            <div className="bg-primary-light flex size-12 items-center justify-center rounded-full">
              <span className="iconify-[material-symbols--calendar-month] text-primary size-6"></span>
            </div>
          </div>
          <h3 className="w-full text-lg">No upcoming bookings yet</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 sm:max-w-93">
      <div className="flex w-full justify-end">
        <button
          aria-label="Edit Venue"
          type="button"
          className="btn-primary flex items-center justify-center gap-2"
          onClick={onEditClick}
        >
          <span className="iconify-[material-symbols--edit-outline]"></span>
          <span>Edit Venue</span>
        </button>
      </div>

      <h2 className="text-xl md:text-2xl">{`Upcoming Bookings (${upcomingBookings.length})`}</h2>

      {bookings.map((booking) => (
        <UpcomingBookingCard
          key={booking.id}
          booking={booking}
          venuePrice={venuePrice}
        />
      ))}
    </section>
  );
};

export default UpcomingBookings;
