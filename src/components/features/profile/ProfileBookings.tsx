import { useState } from "react";
import type { ProfileBooking } from "../../../types/profile";
import ProfileCard from "./cards/ProfileCard";
import BookingCardInfo from "./cards/BookingCardInfo";
import EditBookingModal from "./modals/EditBookingModal";
import { Link } from "react-router-dom";

interface ProfileBookingsProps {
  bookings: ProfileBooking[];
}

const ProfileBookings = ({ bookings }: ProfileBookingsProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<ProfileBooking | null>(
    null,
  );

  if (bookings.length === 0) {
    return (
      <section className="flex flex-col gap-4 lg:gap-6">
        <h2 className="text-2xl lg:text-3xl">Your Bookings</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex w-full justify-center sm:w-fit">
            <div className="bg-primary-light flex size-16 items-center justify-center rounded-full">
              <span className="iconify-[material-symbols--calendar-month] text-primary size-8"></span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="w-full text-center text-lg sm:text-start">
                No bookings yet
              </h3>
              <p>
                Explore our unique destinations to find your perfect holiday
                venue!
              </p>
            </div>
            <Link className="btn-primary" to={"/"}>
              Go to venues
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 lg:gap-6">
      <h2 className="text-2xl lg:text-3xl">Your Bookings</h2>

      <div className="flex flex-wrap gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-2">
        {bookings.map((booking) => {
          const venue = booking.venue;

          return (
            <ProfileCard
              key={booking.id}
              title={venue.name}
              imageUrl={venue.media[0]?.url}
              imageAlt={venue.media[0]?.alt}
              link={`/venue/${venue.id}`}
              actionLabel="Make Changes"
              onAction={() => {
                setSelectedBooking(booking);
                setIsEditModalOpen(true);
              }}
            >
              <BookingCardInfo booking={booking} />
            </ProfileCard>
          );
        })}
      </div>
      <EditBookingModal
        key={selectedBooking?.id}
        booking={selectedBooking ?? undefined}
        venue={selectedBooking?.venue}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </section>
  );
};

export default ProfileBookings;
