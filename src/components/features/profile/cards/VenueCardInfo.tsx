import type { Venue } from "../../../../types/venue";
import { pluralize } from "../../../../utils/pluralize";
import { Link } from "react-router-dom";
import { filterUpcomingBookings } from "../../../../utils/filterUpcomingBookings";

interface VenueCardInfoProps {
  venue: Venue;
}

const VenueCardInfo = ({ venue }: VenueCardInfoProps) => {
  const upcomingBookings = filterUpcomingBookings(venue.bookings);
  const bookingCount = upcomingBookings.length;

  return (
    <ul>
      <li className="flex items-center gap-4">
        <span className="iconify-[material-symbols--star]"></span>
        {`${venue.rating} stars`}
      </li>
      <li>
        <Link
          to={`/venue/${venue.id}`}
          className="hover:text-primary flex items-center gap-4 transition duration-500 ease-in-out"
        >
          <span className="iconify-[material-symbols--calendar-month]"></span>
          {`${bookingCount} upcoming ${pluralize(bookingCount, "booking")}`}
        </Link>
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
