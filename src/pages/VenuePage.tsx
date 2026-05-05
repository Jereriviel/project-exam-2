import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVenueById } from "../api/venues";
import Container from "../layouts/Container";
import Breadcrumb from "../components/ui/BreadCrumb";

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
    <Container>
      <div className="py-4">
        <Breadcrumb venue={venue} />
      </div>

      <section className="w-full py-4">
        <h1>{venue.name}</h1>
      </section>
    </Container>
  );
}

export default VenuePage;
