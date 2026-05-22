import { useState } from "react";
import type { ProfileVenueSummary } from "../../../types/profile";
import ProfileCard from "./cards/ProfileCard";
import VenueCardInfo from "./cards/VenueCardInfo";

interface ProfileVenuesProps {
  venues: ProfileVenueSummary[];
}

const ProfileVenues = ({ venues }: ProfileVenuesProps) => {
  useState<ProfileVenueSummary | null>(null);

  if (venues.length === 0) {
    return (
      <section>
        <h2 className="text-2xl lg:text-3xl">Venues</h2>
        <p>No venues yet.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 lg:gap-6">
      <h2 className="text-2xl lg:text-3xl">Venues</h2>

      <div className="flex flex-wrap gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-2">
        {venues.map((venues) => {
          const venue = venues;

          return (
            <ProfileCard
              key={venue.id}
              title={venue.name}
              imageUrl={venue.media[0]?.url}
              imageAlt={venue.media[0]?.alt}
              link={`/venue/${venue.id}`}
              actionLabel="Edit venue"
              onAction={() => {}}
            >
              <VenueCardInfo venue={venue} />
            </ProfileCard>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileVenues;
