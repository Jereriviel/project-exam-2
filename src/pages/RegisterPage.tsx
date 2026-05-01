import { Helmet } from "react-helmet-async";
import RegisterForm from "../components/features/auth/RegisterForm";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Register</title>
        <meta
          name="description"
          content="Register your personal account on Holidaze"
        />
      </Helmet>

      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-100 space-y-8 px-4">
          <RegisterForm />
          <div className="flex flex-col gap-2 sm:flex-row">
            <p>Already have an account?</p>
            <Link
              className="hover:text-primary font-semibold transition duration-500 ease-in-out"
              to={"/login"}
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
