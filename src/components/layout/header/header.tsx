import { Link } from "react-router-dom";
import logoPrimary from "../../../../public/holidaze_logo_primary.svg";
import SearchBar from "../../features/search/SearchBar";
import { useAuth } from "../../../hooks/useAuth";
import { useProfile } from "../../../hooks/useProfile";
import HeaderProfile from "./HeaderProfile";
import HeaderProfileSkeleton from "./HeaderProfileSkeleton";
import HeaderProfileError from "./HeaderProfileError";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, isError } = useProfile();
  const profile = data?.data;

  return (
    <>
      <header className="bg-secondary-light top-0 z-50 mt-0 w-full space-y-4 p-4 md:space-y-0 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between md:gap-12">
          <Link to={"/"} aria-label="Home" className="shrink-0">
            <img
              src={logoPrimary}
              alt="Holidaze logo"
              className="h-8 w-25 object-cover md:h-12 md:w-40"
            />
          </Link>
          <div className="hidden w-full justify-center md:flex">
            <SearchBar />
          </div>
          {isAuthenticated ? (
            isLoading ? (
              <HeaderProfileSkeleton />
            ) : isError || !profile ? (
              <HeaderProfileError />
            ) : (
              <HeaderProfile profile={profile} />
            )
          ) : (
            <Link to={"/login"} aria-label="Login" className="rounded-xl">
              <div className="btn-primary-sm md:hidden">Login</div>
              <div className="btn-primary hidden md:flex">Login</div>
            </Link>
          )}
        </div>
        <div className="flex w-full md:hidden">
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Header;
