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
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      disabled={disabled}
      className="group data-checked:bg-primary bg-gray-medium inline-flex h-6 w-11 items-center rounded-full transition"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
    </Switch>
  );
};

export default VenueManagerSwitch;
