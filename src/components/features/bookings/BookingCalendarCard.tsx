import { BookingCalendar } from "./BookingCalendar";

const BookingCalendarCard = () => {
  return (
    <div className="flex w-fit flex-col gap-4 rounded-xl bg-white p-4 shadow-lg sm:p-8">
      <BookingCalendar />
      <div className="flex justify-between">
        <p className="font-semibold">Guests:</p>
        <p>- 1 +</p>
      </div>
      <div className="flex justify-between font-semibold">
        <p>Total 2 Nights</p>
        <p className="text-lg">2000 NOK</p>
      </div>
      <button className="btn-primary min-w-full">Book Now</button>
    </div>
  );
};

export default BookingCalendarCard;
