import type { Venue } from "../../../types/venue";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import fallbackImg from "../../../../public/fallback-img.jpg";

type VenueCardProps = {
  venue: Venue;
};

const VenueCard = ({ venue }: VenueCardProps) => {
  const mainImage = venue.media[0];
  const imageSrc = mainImage?.url ? mainImage.url : fallbackImg;

  return (
    <>
      <article className="grid-cols-[minmax(0, 1fr)] grid grid-rows-[max-content] rounded-xl transition duration-300 ease-in-out sm:hover:scale-102">
        <Link className="min-w-0" to={`/venue/${venue.id}`}>
          <img
            src={imageSrc}
            alt={venue.media[0]?.alt || "Venue image"}
            className="aspect-4/3 w-full rounded-xl object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackImg;
            }}
          />
          <div className="grid-cols-auto grid py-4">
            <div className="mt-auto flex min-w-0 flex-col gap-2">
              <div className="min-w-0">
                <h3 className="truncate font-semibold sm:text-lg">
                  {venue.name}
                </h3>
                <div className="text-gray-dark flex items-center gap-2 text-sm">
                  <span className="iconify-[material-symbols--location-on-outline]"></span>
                  <p>{`${venue.location.city || "Unknown"}, ${venue.location.country || "Unknown"}`}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Rating rating={venue.rating} />
                  </div>
                  <p
                    className={`text-sm ${!venue.rating ? "text-gray-medium" : "font-semibold"}`}
                  >
                    {venue.rating || "Not rated yet"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-lg font-semibold">{venue.price} NOK</p>
                  <p className="text-sm">per night</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </>
  );
};

export default VenueCard;
