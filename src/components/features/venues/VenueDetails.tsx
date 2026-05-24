import { useState } from "react";
import AmenityTagList from "./AmenityTagList";
import type { Venue } from "../../../types/venue";
import fallbackImg from "../../../assets/fallback-img.jpg";
import avatarFallbackImg from "../../../assets/avatar-fallback-img.jpg";
import Rating from "./Rating";
import BookingCalendarCard from "../bookings/BookingCalendarCard";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import UpcomingBookings from "../bookings/UpComingBookings";
import EditVenueModal from "../profile/modals/EditVenueModal";

interface VenueDetailsProps {
  venue: Venue;
}

const VenueDetails = ({ venue }: VenueDetailsProps) => {
  const mainImage = venue.media[0];
  const imageSrc = mainImage?.url ? mainImage.url : fallbackImg;
  const profileImage = venue.owner?.avatar;
  const profileImageSrc = profileImage?.url
    ? profileImage.url
    : avatarFallbackImg;
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isOwner = user?.name === venue.owner?.name;

  return (
    <>
      <section className="flex w-full flex-col gap-4 pt-4 pb-8 md:gap-6">
        <img
          className="aspect-2/1 w-full rounded-xl object-cover"
          src={imageSrc}
          alt={venue.media[0]?.alt}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImg;
          }}
        />
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl md:text-3xl">{venue.name}</h1>
                <div className="flex gap-2 text-sm sm:items-center md:text-base">
                  <span className="iconify-[material-symbols--location-on-outline]"></span>
                  <div className="flex flex-wrap gap-1">
                    <p>{`${venue.location.address || "Address: N/A"}, ${venue.location.zip || "Zip Code: N/A"},`}</p>
                    <p>{`${venue.location.city || "City: N/A"}, ${venue.location.country || "Country: N/A"}`}</p>
                  </div>
                </div>
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
                  <p className="text-xl font-semibold md:text-2xl">
                    {venue.price} NOK
                  </p>
                  <p className="text-sm md:text-lg">per night</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl">About</h2>
                <p className="max-w-2xl md:text-lg">{venue.description}</p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl md:text-2xl">Facilities</h2>
                <AmenityTagList meta={venue.meta} />
                <div className="tag">
                  <span className="iconify-[material-symbols--king-bed-outline]"></span>
                  {`Up to ${venue.maxGuests} guests`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:text-lg">
              <img
                className="size-12 rounded-full object-cover"
                src={profileImageSrc}
                alt={venue.owner?.avatar.alt}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = avatarFallbackImg;
                }}
              />
              <div className="flex flex-col">
                <p className="font-semibold">Venue owner</p>
                <p>{`${venue.owner?.name || "Unknown"}`}</p>
              </div>
            </div>
          </div>
          <section className="flex flex-col gap-4 lg:w-93">
            {isAuthenticated && isOwner ? (
              <UpcomingBookings
                bookings={venue.bookings ?? []}
                venuePrice={venue.price}
                onEditClick={() => setIsEditModalOpen(true)}
              />
            ) : (
              <>
                <h2 className="text-xl md:text-2xl">Booking</h2>

                <div className="flex w-full justify-center sm:justify-start">
                  {isAuthenticated ? (
                    <BookingCalendarCard venue={venue} />
                  ) : (
                    <div className="flex w-full flex-col gap-4">
                      <p className="sm:text-lg">
                        Please log in to book this venue.
                      </p>
                      <Link
                        to="/login"
                        className="btn-primary flex items-center justify-center gap-2"
                      >
                        Go to Login
                        <span className="iconify-[material-symbols--arrow-right-alt]"></span>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </section>
      <EditVenueModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        venue={venue}
      />
    </>
  );
};

export default VenueDetails;
