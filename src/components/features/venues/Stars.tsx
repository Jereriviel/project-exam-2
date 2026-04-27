export type Variant = "full" | "half" | "empty";

type StarProps = {
  variant: Variant;
};

const Star = ({ variant }: StarProps) => {
  if (variant === "full") {
    return (
      <span className="iconify-[material-symbols--star-rate] text-primary"></span>
    );
  }

  if (variant === "half") {
    return (
      <span className="iconify-[material-symbols--star-rate-half] text-primary"></span>
    );
  }

  return (
    <span className="iconify-[material-symbols--star-rate-outline] text-primary"></span>
  );
};

export default Star;
