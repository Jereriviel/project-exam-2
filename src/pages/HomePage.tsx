import VenueList from "../components/features/home/VenueList";
import { Helmet } from "react-helmet-async";
import Container from "../layouts/Container";
import Hero from "../components/features/home/Hero";

<Helmet>
  <title>Holidaze | Book your stay</title>
  <meta
    name="description"
    content="Welcome to Holidaze - the best place to find unique venues."
  />
</Helmet>;

function HomePage() {
  return (
    <>
      <Hero />
      <Container>
        <section className="w-full">
          <div className="py-4">
            <h1 className="text-4xl">Venues</h1>
          </div>
          <VenueList />
        </section>
      </Container>
    </>
  );
}

export default HomePage;
