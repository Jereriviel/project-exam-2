interface GuestSelectorProps {
  guests: number;
  maxGuests: number;
  onChange: (guests: number) => void;
}

const GuestSelector = ({ guests, maxGuests, onChange }: GuestSelectorProps) => {
  return (
    <div className="flex items-center justify-between font-semibold">
      <p>Guests:</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(1, guests - 1))}
          className="btn-primary-round sm:size-8"
        >
          <span className="iconify-[material-symbols--remove] text-white"></span>
        </button>
        <span className="font-medium">{guests}</span>
        <button
          onClick={() => onChange(Math.min(maxGuests, guests + 1))}
          className="btn-primary-round sm:size-8"
        >
          <span className="iconify-[material-symbols--add] text-white"></span>
        </button>
      </div>
    </div>
  );
};

export default GuestSelector;
