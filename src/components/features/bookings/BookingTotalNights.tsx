import { type DateRange } from "react-day-picker";
import { calculateBookingDetails } from "../../../utils/bookingCalculations";

interface BookingTotalNightsProps {
  dateRange: DateRange;
  pricePerNight: number;
}

const BookingTotalNights = ({
  dateRange,
  pricePerNight,
}: BookingTotalNightsProps) => {
  const { nights, totalAmount, nightLabel } = calculateBookingDetails(
    dateRange.from?.toISOString().split("T")[0] ?? "",
    dateRange.to?.toISOString().split("T")[0] ?? "",
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
