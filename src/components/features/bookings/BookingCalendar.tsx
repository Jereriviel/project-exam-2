import { DayPicker, type DateRange } from "react-day-picker";
import { startOfDay } from "date-fns";
import "react-day-picker/style.css";
import "./booking-calendar.css";

interface BookingCalendarProps {
  selected: DateRange;
  onDateChange: (range: DateRange | undefined) => void;
  disabledDates?: { from: Date; to: Date }[];
  month?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
}

export function BookingCalendar({
  selected,
  onDateChange,
  disabledDates,
  month,
  onMonthChange,
  minDate,
}: BookingCalendarProps) {
  const handleSelect = (range: DateRange | undefined) => {
    onDateChange(range);
  };
  const minimumDate = minDate ?? startOfDay(new Date());

  return (
    <div>
      <DayPicker
        animate
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        disabled={(date) => {
          const isPast = startOfDay(date) < minimumDate;
          const isBlocked = (disabledDates ?? []).some(
            (range) => date >= range.from && date <= range.to,
          );
          return isPast || isBlocked;
        }}
        required={true}
        resetOnSelect={true}
        excludeDisabled={true}
        showOutsideDays={true}
        month={month}
        onMonthChange={onMonthChange}
      />
      {selected?.from ? (
        <div className="flex gap-2 pt-4 pb-2 font-medium">
          <p>
            From {selected.from.toLocaleDateString()} to{" "}
            {selected.to ? selected.to.toLocaleDateString() : ""}
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
