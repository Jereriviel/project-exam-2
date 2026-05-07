import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getVenueById } from "../api/venues";
import Container from "../layouts/Container";
import Breadcrumb from "../components/ui/BreadCrumb";
import type { Venue } from "../types/venue";
import VenueDetails from "../components/features/venues/VenueDetails";
import VenuePageSkeleton from "../components/features/venues/VenuePageLoadingSkeleton";
import ErrorModal from "../components/ui/ErrorModal";
import { ApiError } from "../error/ApiError";

function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalClosed, setIsModalClosed] = useState(false);

  const {
    data: venue,
    isLoading,
    isError,
    error,
  } = useQuery<Venue>({
    queryKey: ["venue", id],
    queryFn: () => getVenueById(id!),
  });

  useEffect(() => {
    if (isError && error instanceof ApiError && error.statusCode === 404) {
      navigate("/404");
    }
  }, [isError, error, navigate]);

  const apiError =
    error instanceof ApiError
      ? error
      : new ApiError(500, "Server Error", "An unexpected error occurred");

  const showModal = isError && apiError.statusCode !== 404 && !isModalClosed;

  if (isLoading) {
    return (
      <Container>
        <div className="pt-4">
          <div className="fade-in">
            <VenuePageSkeleton />
          </div>
        </div>
      </Container>
    );
  }

  if (!venue && !isError) {
    return (
      <Container>
        <p className="py-4 font-semibold">Venue not found.</p>
      </Container>
    );
  }

  return (
    <>
      {venue && (
        <>
          <Helmet>
            <title>Holidaze | {venue.name}</title>
            <meta
              name="description"
              content={venue.description.slice(0, 160)}
            />
          </Helmet>

          <Container>
            <div className="pt-4">
              <Breadcrumb venue={venue} />

              <div className="fade-in">
                <VenueDetails venue={venue} />
              </div>
            </div>
          </Container>
        </>
      )}
      <ErrorModal
        isOpen={showModal}
        onClose={() => {
          setIsModalClosed(true);
          navigate("/");
        }}
        error={showModal ? apiError : null}
      />
    </>
  );
}

export default VenuePage;
