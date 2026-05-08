import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "./booking-calendar.css";

export function BookingCalendar() {
  const [selected, setSelected] = useState<DateRange | undefined>();

  const handleSelect = (range: DateRange | undefined) => {
    setSelected(range);
  };

  return (
    <div>
      <DayPicker
        animate
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        required={true}
        resetOnSelect={true}
        min={1}
        max={100}
        excludeDisabled={true}
        showOutsideDays={true}
      />
      {selected?.from ? (
        <p>
          Fra: {selected.from.toLocaleDateString()}
          Til: {selected.to ? selected.to.toLocaleDateString() : ""}
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
