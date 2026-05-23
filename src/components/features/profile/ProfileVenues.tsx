import { useState } from "react";
import type { ProfileVenueSummary } from "../../../types/profile";
import ProfileCard from "./cards/ProfileCard";
import VenueCardInfo from "./cards/VenueCardInfo";
import CreateVenueModal from "./modals/CreateVenueModal";
import EditVenueModal from "./modals/EditVenueModal";

interface ProfileVenuesProps {
  venues: ProfileVenueSummary[];
}

const ProfileVenues = ({ venues }: ProfileVenuesProps) => {
  const [selectedVenue, setSelectedVenue] =
    useState<ProfileVenueSummary | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (venues.length === 0) {
    return (
      <section className="flex flex-col gap-4 lg:gap-6">
        <h2 className="text-2xl lg:text-3xl">Your Venues</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex w-full justify-center sm:w-fit">
            <div className="bg-primary-light flex size-16 items-center justify-center rounded-full">
              <span className="iconify-[material-symbols--house] text-primary size-8"></span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="w-full text-center text-lg sm:text-start">
                No venues yet
              </h3>
              <p>
                Have venue you would like to rent out? Follow these easy steps
                to get started!
              </p>
            </div>
            <button
              type="button"
              className="btn-primary flex items-center justify-center gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <span className="iconify-[ic--outline-plus] size-6 text-white"></span>
              <span>Add new venue</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-4 lg:gap-6">
        <h2 className="text-2xl lg:text-3xl">Your Venues</h2>

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
                actionLabel="Edit Venue"
                onAction={() => {
                  setSelectedVenue(venue);
                  setIsEditModalOpen(true);
                }}
              >
                <VenueCardInfo venue={venue} />
              </ProfileCard>
            );
          })}
        </div>
        <button
          type="button"
          className="btn-primary flex items-center justify-center gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <span className="iconify-[ic--outline-plus] size-6 text-white"></span>
          <span>Add new venue</span>
        </button>
      </section>
      <CreateVenueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      {selectedVenue && (
        <EditVenueModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          venue={selectedVenue}
        />
      )}
    </>
  );
};

export default ProfileVenues;
