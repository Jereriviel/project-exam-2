import { Switch } from "@headlessui/react";
import { useState } from "react";

const VenueManagerSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group data-checked:bg-primary bg-gray-medium inline-flex h-6 w-11 items-center rounded-full transition"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
    </Switch>
  );
};

export default VenueManagerSwitch;
