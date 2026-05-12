import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "./booking-calendar.css";

interface BookingCalendarProps {
  selected: DateRange;
  onDateChange: (range: DateRange | undefined) => void;
  disabledDates?: { from: Date; to: Date }[];
}

export function BookingCalendar({
  selected,
  onDateChange,
  disabledDates,
}: BookingCalendarProps) {
  const handleSelect = (range: DateRange | undefined) => {
    onDateChange(range);
  };

  return (
    <div>
      <DayPicker
        animate
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        disabled={disabledDates}
        required={true}
        resetOnSelect={true}
        excludeDisabled={true}
        showOutsideDays={true}
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
