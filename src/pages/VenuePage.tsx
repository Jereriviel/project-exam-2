import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { getVenueById } from "../api/venues";
import Container from "../layouts/Container";
import Breadcrumb from "../components/ui/BreadCrumb";
import AmenityTagList from "../components/features/venues/AmenityTagList";

function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: venue,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["venue", id],
    queryFn: () => getVenueById(id!),
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !venue)
    return <p>Couldn't find the venue you're looking for.</p>;

  return (
    <>
      <Helmet>
        <title>Holidaze | {venue.name}</title>
        <meta name="description" content={venue.description.slice(0, 160)} />
      </Helmet>
      <Container>
        <div className="py-4">
          <Breadcrumb venue={venue} />
        </div>
        <section className="w-full py-4">
          <h1 className="text-2xl sm:text-3xl">{venue.name}</h1>
          <div className="py-4">
            <AmenityTagList meta={venue.meta} />
          </div>
        </section>
      </Container>
    </>
  );
}

export default VenuePage;
