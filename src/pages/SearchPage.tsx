import SearchResults from "../components/features/search/SearchResults";
import Container from "../layouts/Container";

function SearchPage() {
  return (
    <>
      <Container>
        <section className="w-full py-4">
          <div className="py-4">
            <h1 className="text-4xl">Search Results</h1>
          </div>
          <SearchResults />
        </section>
      </Container>
    </>
  );
}

export default SearchPage;
