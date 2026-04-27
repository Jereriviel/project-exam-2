import { Link } from "react-router-dom";
import logoPrimary from "../../../public/holidaze_logo_primary.svg";

const Header = () => {
  return (
    <>
      <header className="bg-secondary-light sticky top-0 z-50 mt-0 w-full p-4 sm:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to={"/"} aria-label="Home">
            <img
              src={logoPrimary}
              alt="Holidaze logo"
              className="h-8 w-25 object-cover sm:h-12 sm:w-40"
            />
          </Link>
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
      </header>
    </>
  );
};

export default Header;
