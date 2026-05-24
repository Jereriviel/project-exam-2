import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import fallbackImg from "../../../../assets/fallback-img.jpg";

interface ProfileCardProps {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  link: string;
  children: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const ProfileCard = ({
  title,
  imageUrl,
  imageAlt,
  link,
  children,
  actionLabel,
  onAction,
}: ProfileCardProps) => {
  return (
    <article className="grid grid-cols-1 overflow-hidden rounded-xl xl:grid-cols-2">
      <Link to={link}>
        <img
          src={imageUrl || fallbackImg}
          alt={imageAlt || title}
          className="aspect-5/3 w-full overflow-hidden rounded-t-xl rounded-b-none object-cover lg:aspect-4/3 xl:rounded-s-xl xl:rounded-e-none"
        />
      </Link>
      <div className="bg-secondary-light flex flex-col gap-4 rounded-t-none rounded-b-xl p-4 xl:rounded-s-none xl:rounded-e-xl">
        <h3 className="truncate lg:text-xl">{title}</h3>
        {children}
        <button
          type="button"
          className="btn-primary-sm flex items-center justify-center gap-2"
          onClick={onAction}
        >
          <span className="iconify-[material-symbols--edit-outline]"></span>
          {actionLabel}
        </button>
      </div>
    </article>
  );
};

export default ProfileCard;
