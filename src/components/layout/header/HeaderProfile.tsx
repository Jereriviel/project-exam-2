import type { Profile } from "../../../types/profile";
import avatarFallbackImg from "../../../../public/avatar-fallback-img.jpg";

interface HeaderProfileProps {
  profile: Profile;
}

const HeaderProfile = ({ profile }: HeaderProfileProps) => {
  const profileImage = profile?.avatar;
  const profileImageSrc = profileImage?.url
    ? profileImage.url
    : avatarFallbackImg;

  return (
    <div className="flex shrink-0 items-center gap-4 font-medium">
      <p className="text-sm md:text-base">{`Welcome, ${profile?.name || "Unknown"}!`}</p>
      <img
        className="size-10 rounded-full object-cover md:size-12"
        src={profileImageSrc}
        alt={profile?.avatar?.alt || "Profile avatar"}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = avatarFallbackImg;
        }}
      />
    </div>
  );
};

export default HeaderProfile;
