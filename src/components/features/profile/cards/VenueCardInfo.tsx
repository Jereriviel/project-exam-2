import type { Venue } from "../../../../types/venue";
import { pluralize } from "../../../../utils/pluralize";
import { Link } from "react-router-dom";

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
      <li>
        <Link
          to={`/venue/${venue.id}`}
          className="hover:text-primary flex items-center gap-4 transition duration-500 ease-in-out"
        >
          <span className="iconify-[material-symbols--calendar-month]"></span>
          {`${upcomingBookings} upcoming ${pluralize(
            upcomingBookings,
            "booking",
          )}`}
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
