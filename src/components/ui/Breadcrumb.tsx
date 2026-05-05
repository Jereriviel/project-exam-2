import { Link } from "react-router-dom";
import type { Venue } from "../../types/venue";

type BreadcrumbProps = {
  venue: Venue;
};

const Breadcrumb = ({ venue }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link to="/" className="font-semibold">
        Venues
      </Link>
      <span
        aria-hidden="true"
        className="iconify-[material-symbols--chevron-right]"
      ></span>
      <p className="text-gray-dark truncate">{venue.name}</p>
    </nav>
  );
};

export default Breadcrumb;
