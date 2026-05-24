import type { Booking } from "../../../types/booking";
import { formatDate } from "../../../utils/formatDate";
import { pluralize } from "../../../utils/pluralize";
import { calculateBookingPrice } from "../../../utils/calculateTotalPrice";
import { calculateNights } from "../../../utils/calculateNights";

interface UpcomingBookingProps {
  booking: Booking;
  venuePrice: number;
}

const UpcomingBookingCard = ({ booking, venuePrice }: UpcomingBookingProps) => {
  const nights = calculateNights(booking.dateFrom, booking.dateTo);
  const totalPrice = calculateBookingPrice(venuePrice, nights);

  return (
    <article className="bg-secondary-light border-secondary rounded-xl border p-4">
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-4">
          <span className="iconify-[material-symbols--calendar-month]"></span>
          {`${formatDate(booking.dateFrom)} - ${formatDate(booking.dateTo)}`}
        </li>

        <li className="flex items-center gap-4">
          <span className="iconify-[mdi--user]"></span>
          {`${booking.customer?.name}`}
        </li>

        <li className="flex items-center gap-4">
          <span className="iconify-[material-symbols--bed]"></span>
          {`${booking.guests} ${pluralize(booking.guests, "guest")}`}
        </li>

        <li className="flex items-center gap-4">
          <span className="iconify-[mdi--dollar]"></span>
          {`${totalPrice} NOK`}
        </li>
      </ul>
    </article>
  );
};

export default UpcomingBookingCard;
