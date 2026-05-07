import type { VenueMeta } from "../../../types/venue";
import Tag from "./AmenityTag";

interface TagListProps {
  meta: VenueMeta;
}

const AmenityTagList = ({ meta }: TagListProps) => {
  const amenities = Object.entries(meta) as [keyof VenueMeta, boolean][];

  return (
    <div className="flex flex-wrap gap-4">
      {amenities.map(([type, value]) => (
        <Tag key={type} type={type} value={value} />
      ))}
    </div>
  );
};

export default AmenityTagList;
