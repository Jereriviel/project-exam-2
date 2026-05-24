import { Switch } from "@headlessui/react";

interface VenueManagerSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

const VenueManagerSwitch = ({
  enabled,
  onChange,
  disabled,
}: VenueManagerSwitchProps) => {
  const isVenueManager = enabled;
  return (
    <div className="flex gap-4">
      <Switch
        aria-label="Venue Manager"
        checked={enabled}
        onChange={onChange}
        disabled={disabled}
        className="group data-checked:bg-primary bg-gray-medium inline-flex h-6 w-11 items-center rounded-full transition"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
      </Switch>
      <span>{`${isVenueManager ? "Yes" : "No"}`}</span>
    </div>
  );
};

export default VenueManagerSwitch;
