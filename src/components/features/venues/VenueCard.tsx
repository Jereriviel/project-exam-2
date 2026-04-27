import type { Venue } from "../../../types/venue";
import { Link } from "react-router-dom";
import Rating from "./Rating";

type VenueCardProps = {
  venue: Venue;
};

const VenueCard = ({ venue }: VenueCardProps) => {
  return (
    <>
      <article className="grid-cols-[minmax(0, 1fr)] grid w-full max-w-70 grid-rows-[max-content] rounded-xl transition duration-300 ease-in-out sm:hover:scale-102">
        <Link to={`/venue/${venue.id}`}>
          <img
            src={venue.media[0]?.url}
            alt={venue.media[0]?.alt}
            className="aspect-4/3 w-full rounded-xl object-cover"
          />
          <div className="grid-cols-auto grid py-4">
            <div className="mt-auto flex flex-col gap-2">
              <div>
                <h3 className="font-semibold sm:text-lg">{venue.name}</h3>
                <div className="text-gray-dark flex items-center gap-2 text-sm">
                  <span className="iconify-[material-symbols--location-on-outline]"></span>
                  <p>{`${venue.location.city}, ${venue.location.country}`}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Rating rating={venue.rating} />
                  </div>
                  <p className="text-sm font-semibold">{venue.rating}</p>
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
