import type { ProfileBooking } from "../../../types/profile";
import ProfileCard from "./cards/ProfileCard";
import BookingCardInfo from "./cards/BookingCardInfo";

interface ProfileBookingsProps {
  bookings: ProfileBooking[];
}

const ProfileBookings = ({ bookings }: ProfileBookingsProps) => {
  if (bookings.length === 0) {
    return (
      <section>
        <h2>Bookings</h2>
        <p>No bookings yet.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 lg:gap-6">
      <h2 className="text-2xl lg:text-3xl">Bookings</h2>

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
            >
              <BookingCardInfo booking={booking} />
            </ProfileCard>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileBookings;
