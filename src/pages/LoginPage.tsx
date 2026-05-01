import { Helmet } from "react-helmet-async";
import LoginForm from "../components/features/auth/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Login</title>
        <meta
          name="description"
          content="Log into your personal account on Holidaze"
        />
      </Helmet>

      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-100 space-y-8 px-4">
          <LoginForm />
          <div className="flex flex-col gap-2 sm:flex-row">
            <p>Don't have an account?</p>
            <Link
              className="hover:text-primary font-semibold transition duration-500 ease-in-out"
              to={"/register"}
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
