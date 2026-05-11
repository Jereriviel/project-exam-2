import { differenceInDays, parseISO } from "date-fns";

export const calculateBookingDetails = (
  dateFrom: string,
  dateTo: string,
  pricePerNight: number,
) => {
  if (!dateFrom || !dateTo) {
    return {
      nights: 0,
      totalAmount: 0,
      nightLabel: "nights",
    };
  }

  const start = parseISO(dateFrom);
  const end = parseISO(dateTo);
  const nights = differenceInDays(end, start);

  const safeNights = Math.max(0, nights);
  const totalAmount = safeNights * pricePerNight;

  return {
    nights: safeNights,
    totalAmount: totalAmount,
    nightLabel: safeNights === 1 ? "night" : "nights",
  };
};
