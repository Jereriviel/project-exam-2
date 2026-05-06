import { AMENITY_MAP } from "../../../utils/amenityConstants";
import type { VenueMeta } from "../../../types/venue";

interface TagProps {
  type: keyof VenueMeta;
  value: boolean;
}

const AmenityTag = ({ type, value }: TagProps) => {
  if (!value) return null;

  const { text, iconClass } = AMENITY_MAP[type];

  return (
    <div className="tag">
      <span className={iconClass}></span>
      <p>{text}</p>
    </div>
  );
};

export default AmenityTag;
