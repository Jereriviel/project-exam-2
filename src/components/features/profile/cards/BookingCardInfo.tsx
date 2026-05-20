import type { Booking } from "../../../../types/booking";
import { calculateNights } from "../../../../utils/calculateNights";
import { pluralize } from "../../../../utils/pluralize";
import { calculateBookingPrice } from "../../../../utils/calculateTotalPrice";
import { formatDate } from "../../../../utils/formatDate";

interface BookingCardInfoProps {
  booking: Booking;
}

const BookingCardInfo = ({ booking }: BookingCardInfoProps) => {
  const nights = calculateNights(booking.dateFrom, booking.dateTo);
  const totalPrice = booking.venue
    ? calculateBookingPrice(booking.venue.price, nights)
    : 0;

  return (
    <ul>
      <li className="flex items-center gap-4">
        <span className="iconify-[material-symbols--calendar-month]"></span>
        {`${formatDate(booking.dateFrom)} - ${formatDate(booking.dateTo)}`}
      </li>
      <li className="flex items-center gap-4">
        <span className="iconify-[material-symbols--moon-stars]"></span>
        {`${nights} ${pluralize(nights, "night")}`}
      </li>
      <li className="flex items-center gap-4">
        <span className="iconify-[mdi--users]"></span>
        {`${booking.guests} ${pluralize(booking.guests, "guest")}`}
      </li>
      <li className="flex items-center gap-4">
        <span className="iconify-[mdi--dollar]"></span>
        {`${totalPrice} NOK`}
      </li>
    </ul>
  );
};

export default BookingCardInfo;
