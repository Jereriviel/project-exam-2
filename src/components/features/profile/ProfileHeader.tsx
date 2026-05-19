import type { Profile } from "../../../types/profile";
import avatarFallbackImg from "../../../../public/avatar-fallback-img.jpg";
import VenueManagerSwitch from "./VenueManagerSwitch";

interface ProfileHeaderProps {
  profile: Profile;
  onToggleVenueManager: () => void;
  isUpdating: boolean;
}

const ProfileHeader = ({
  profile,
  onToggleVenueManager,
  isUpdating,
}: ProfileHeaderProps) => {
  const profileImage = profile?.avatar;
  const profileImageSrc = profileImage?.url
    ? profileImage.url
    : avatarFallbackImg;

  return (
    <>
      <section className="bg-secondary-light relative w-full overflow-hidden">
        <div className="flex w-full flex-col gap-4 px-4 pt-8 pb-12 md:pb-16 lg:gap-8 lg:px-8 lg:pb-20">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-display truncate text-4xl font-bold lg:text-5xl">
                {`Hello, ${profile.name}!`}
              </h1>
              <div className="relative">
                <img
                  className="size-36 rounded-full object-cover lg:size-40"
                  src={profileImageSrc}
                  alt={profile?.avatar?.alt || "Profile avatar"}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      avatarFallbackImg;
                  }}
                />
                <button className="btn-primary-round absolute right-0 bottom-0">
                  <span className="iconify-[material-symbols--edit-outline] size-5"></span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:gap-8 lg:self-end lg:text-lg">
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                <div className="flex flex-col">
                  <h3>Name</h3>
                  <p>{profile.name}</p>
                </div>
                <div className="flex flex-col">
                  <h3>Email</h3>
                  <p>{profile.email}</p>
                </div>
                <div className="flex flex-col">
                  <h3>Venue Manager</h3>
                  <VenueManagerSwitch
                    enabled={profile.venueManager}
                    onChange={onToggleVenueManager}
                    disabled={isUpdating}
                  />
                </div>
              </div>
              <div className="relative w-fit">
                <div className="flex flex-col">
                  <h3>About</h3>
                  <p>{profile.bio}</p>
                </div>
                <button className="btn-primary-round absolute -right-10 -bottom-1">
                  <span className="iconify-[material-symbols--edit-outline] size-5"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full leading-0">
          <svg
            viewBox="0 0 1440 40"
            className="relative block h-auto w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,0 C480,40 960,40 1440,0 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default ProfileHeader;
