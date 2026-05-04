import { Link } from "react-router-dom";
import logoPrimary from "../../../public/holidaze_logo_primary.svg";
import SearchBar from "../features/search/SearchBar";

const Header = () => {
  return (
    <>
      <header className="bg-secondary-light top-0 z-50 mt-0 w-full space-y-4 p-4 sm:space-y-0 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between sm:gap-12">
          <Link to={"/"} aria-label="Home" className="shrink-0">
            <img
              src={logoPrimary}
              alt="Holidaze logo"
              className="h-8 w-25 object-cover sm:h-12 sm:w-40"
            />
          </Link>
          <div className="hidden w-full justify-center sm:flex">
            <SearchBar />
          </div>
          <Link to={"/login"} aria-label="Login">
            <div className="btn-primary-sm sm:hidden">Login</div>
            <div className="btn-primary hidden sm:flex">Login</div>
          </Link>
        </div>
        <div className="flex w-full sm:hidden">
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Header;
