import avatarFallbackImg from "../../../assets/avatar-fallback-img.jpg";

const HeaderProfileError = () => {
  return (
    <div className="flex shrink-0 items-center gap-4">
      <p className="w-full text-sm font-medium">Profile unavailable</p>
      <img
        className="size-12 rounded-full object-cover"
        src={avatarFallbackImg}
        alt="Default profile avatar"
      />
    </div>
  );
};

export default HeaderProfileError;
