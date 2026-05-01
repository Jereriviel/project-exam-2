import VenueList from "../components/features/home/VenueList";
import { Helmet } from "react-helmet-async";

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
      <section className="w-full p-4 sm:py-8"></section>
      <section className="w-full p-4 sm:py-8">
        <div className="py-4">
          <h1 className="text-4xl">Venues</h1>
        </div>
        <VenueList />
      </section>
    </>
  );
}

export default HomePage;
