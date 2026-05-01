import VenueList from "../components/features/venues/VenueList";

function HomePage() {
  return (
    <>
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
