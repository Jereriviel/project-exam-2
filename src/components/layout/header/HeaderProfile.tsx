import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { Profile } from "../../../types/profile";
import avatarFallbackImg from "../../../../public/avatar-fallback-img.jpg";

interface HeaderProfileProps {
  profile: Profile;
}

const HeaderProfile = ({ profile }: HeaderProfileProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const profileImage = profile?.avatar;
  const profileImageSrc = profileImage?.url
    ? profileImage.url
    : avatarFallbackImg;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-4 font-medium sm:shrink-0">
      <p className="truncate text-sm md:text-base">{`Welcome, ${profile?.name || "Unknown"}!`}</p>
      <Menu>
        <MenuButton className="shrink-0 rounded-full">
          <img
            className="size-10 rounded-full object-cover md:size-12"
            src={profileImageSrc}
            alt={profile?.avatar?.alt || "Profile avatar"}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = avatarFallbackImg;
            }}
          />
        </MenuButton>
        <MenuItems
          className="z-50 mt-4 flex w-full flex-col bg-white shadow-lg md:w-75 md:rounded-xl"
          anchor="bottom end"
        >
          <MenuItem>
            <Link
              to="/profile"
              aria-label="Profile"
              className="data-focus:bg-primary-ultra-light flex items-center gap-2 p-4"
            >
              <span className="iconify-[material-symbols--person-outline]"></span>
              <span>Profile</span>
            </Link>
          </MenuItem>
          <hr className="text-gray-medium mx-4" />
          <MenuItem>
            <button
              onClick={handleLogout}
              className="data-focus:bg-primary-ultra-light flex items-center gap-2 p-4"
            >
              <span className="iconify-[material-symbols--logout-rounded]"></span>
              <span>Log out</span>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default HeaderProfile;
