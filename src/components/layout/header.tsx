import { Link } from "react-router-dom";
import logoPrimary from "../../../public/holidaze_logo_primary.svg";
import SearchBar from "../features/search/SearchBar";

const Header = () => {
  return (
    <>
      <header className="bg-secondary-light sticky top-0 z-50 mt-0 w-full space-y-4 p-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between sm:gap-12">
          <Link to={"/"} aria-label="Home">
            <img
              src={logoPrimary}
              alt="Holidaze logo"
              className="h-8 w-25 object-cover sm:h-12 sm:w-40"
            />
          </Link>
          <div className="hidden w-full sm:flex">
            <SearchBar />
          </div>

          <Link to={"/login"} aria-label="Login" className="hidden sm:block">
            <div className="btn-primary">
              <p>Login</p>
            </div>
          </Link>
          <Link to={"/login"} aria-label="Login" className="block sm:hidden">
            <div className="btn-primary-round">
              <span className="iconify-[material-symbols--person-outline]"></span>
            </div>
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
