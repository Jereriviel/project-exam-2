import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { getVenueById } from "../api/venues";
import Container from "../layouts/Container";
import Breadcrumb from "../components/ui/BreadCrumb";
import AmenityTagList from "../components/features/venues/AmenityTagList";
import type { Venue } from "../types/venue";
import fallbackImg from "../../public/fallback-img.jpg";
import avatarFallbackImg from "../../public/avatar-fallback-img.jpg";
import Rating from "../components/features/venues/Rating";

function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: venue,
    isLoading,
    isError,
  } = useQuery<Venue>({
    queryKey: ["venue", id],
    queryFn: () => getVenueById(id!),
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !venue)
    return <p>Couldn't find the venue you're looking for.</p>;

  const mainImage = venue.media[0];
  const imageSrc = mainImage?.url ? mainImage.url : fallbackImg;
  const profileImage = venue.owner?.avatar;
  const profileImageSrc = profileImage?.url
    ? profileImage.url
    : avatarFallbackImg;

  return (
    <>
      <Helmet>
        <title>Holidaze | {venue.name}</title>
        <meta name="description" content={venue.description.slice(0, 160)} />
      </Helmet>
      <Container>
        <div className="pt-4">
          <Breadcrumb venue={venue} />
        </div>
        <section className="flex w-full flex-col gap-4 py-4 md:gap-6">
          <img
            className="aspect-2/1 w-full rounded-xl object-cover"
            src={imageSrc}
            alt={venue.media[0]?.alt}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackImg;
            }}
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl">{venue.name}</h1>
            <div className="flex gap-2 text-sm sm:items-center md:text-base">
              <span className="iconify-[material-symbols--location-on-outline]"></span>
              <div className="flex flex-wrap gap-1">
                <p>{`${venue.location.address || "Address: N/A"}, ${venue.location.zip || "Zip Code: N/A"},`}</p>
                <p>{`${venue.location.city || "City: N/A"}, ${venue.location.country || "Country: N/A"}`}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Rating rating={venue.rating} />
              </div>
              <p
                className={`text-sm ${!venue.rating ? "text-gray-medium" : "font-semibold"}`}
              >
                {venue.rating || "Not rated yet"}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-xl font-semibold md:text-2xl">
                {venue.price} NOK
              </p>
              <p className="text-sm md:text-lg">per night</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl">Description</h2>
            <p className="md:text-lg">{venue.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl">Includes</h2>
            <div className="flex flex-col gap-4">
              <AmenityTagList meta={venue.meta} />
              <div className="tag">
                <span className="iconify-[material-symbols--king-bed-outline]"></span>
                {`Up to ${venue.maxGuests} guests`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:text-lg">
            <img
              className="size-12 rounded-full object-cover"
              src={profileImageSrc}
              alt={venue.owner?.avatar.alt}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = avatarFallbackImg;
              }}
            />
            <div className="flex flex-col">
              <p className="font-semibold">Venue owner</p>
              <p>{`${venue.owner?.name || "Unknown"}`}</p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

export default VenuePage;
