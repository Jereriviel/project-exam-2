import Star, { type Variant } from "./Stars";

type RatingProps = {
  rating: number;
};

function getVariant(starNumber: number, rating: number): Variant {
  if (rating >= starNumber) return "full";
  if (rating >= starNumber - 0.5) return "half";
  return "empty";
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <>
      <Star variant={getVariant(1, rating)} />
      <Star variant={getVariant(2, rating)} />
      <Star variant={getVariant(3, rating)} />
      <Star variant={getVariant(4, rating)} />
      <Star variant={getVariant(5, rating)} />
    </>
  );
};

export default Rating;
