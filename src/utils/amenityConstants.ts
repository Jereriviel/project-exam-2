import type { VenueMeta } from "../types/venue";

interface AmenityConfig {
  text: string;
  iconClass: string;
}

export const AMENITY_MAP: Record<keyof VenueMeta, AmenityConfig> = {
  breakfast: {
    text: "Breakfast",
    iconClass: "iconify-[material-symbols--local-dining]",
  },
  parking: {
    text: "Parking",
    iconClass: "iconify-[material-symbols--local-parking]",
  },
  wifi: {
    text: "Wifi",
    iconClass: "iconify-[material-symbols--android-wifi-3-bar]",
  },
  pets: {
    text: "Pets",
    iconClass: "iconify-[material-symbols--pets]",
  },
};
