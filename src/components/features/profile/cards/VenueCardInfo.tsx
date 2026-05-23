import type { Venue } from "../../../../types/venue";
import { pluralize } from "../../../../utils/pluralize";

interface VenueCardInfoProps {
  venue: Venue;
}

const VenueCardInfo = ({ venue }: VenueCardInfoProps) => {
  const upcomingBookings =
    venue.bookings?.filter((booking) => new Date(booking.dateTo) >= new Date())
      .length || 0;

  return (
    <ul>
      <li className="flex items-center gap-4">
        <span className="iconify-[material-symbols--star]"></span>
        {`${venue.rating} stars`}
      </li>
      <li className="flex items-center gap-4">
        <span className="iconify-[material-symbols--calendar-month]"></span>
        {`${upcomingBookings} upcoming ${pluralize(
          upcomingBookings,
          "booking",
        )}`}
      </li>
      <li className="flex items-center gap-4">
        <span className="iconify-[mdi--users]"></span>
        {`Up to ${venue.maxGuests} ${pluralize(venue.maxGuests, "guest")}`}
      </li>
      <li className="flex items-center gap-4">
        <span className="iconify-[mdi--dollar]"></span>
        {`${venue.price} NOK per night`}
      </li>
    </ul>
  );
};

export default VenueCardInfo;
