import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Holidaze | 404 Not Found</title>
        <meta name="description" content="Error 404: Page not found." />
      </Helmet>
      <section className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="flex flex-col justify-center gap-4 px-4 py-8 sm:w-fit sm:px-8">
          <div className="flex flex-col items-center">
            <h1 className="text-primary text-[88px] leading-none font-black sm:text-[102px]">
              404
            </h1>
            <p className="text-xl font-light uppercase sm:text-2xl">
              Page Not Found
            </p>
          </div>
          <p className="text-center text-lg">
            The page you're looking for has been moved or does not exist.
          </p>
        </div>
        <Link className="btn-primary" to={"/"}>
          Back to Homepage
        </Link>
      </section>
    </>
  );
}

export default NotFoundPage;
