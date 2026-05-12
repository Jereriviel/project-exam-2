import { type DateRange } from "react-day-picker";
import { calculateBookingDetails } from "../../../utils/bookingCalculations";
import { format } from "date-fns";

interface BookingTotalNightsProps {
  dateRange: DateRange;
  pricePerNight: number;
}

const BookingTotalNights = ({
  dateRange,
  pricePerNight,
}: BookingTotalNightsProps) => {
  const { nights, totalAmount, nightLabel } = calculateBookingDetails(
    dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
    dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "",
    pricePerNight,
  );

  return (
    <div className="font flex items-center justify-between font-semibold">
      <p>
        Total {nights} {nightLabel}:
      </p>
      <p className="text-lg">{totalAmount} NOK</p>
    </div>
  );
};

export default BookingTotalNights;
