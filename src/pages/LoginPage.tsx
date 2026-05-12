import { Helmet } from "react-helmet-async";
import LoginForm from "../components/features/auth/LoginForm";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Helmet>
        <title>Holidaze | Login</title>
        <meta
          name="description"
          content="Log into your personal account on Holidaze"
        />
      </Helmet>

      <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <button
            className="hover:text-primary flex w-fit items-center gap-2 pr-1 font-semibold transition duration-250 ease-in-out"
            onClick={handleBack}
          >
            <span className="iconify-[material-symbols--arrow-back]"></span>
            <p>Back</p>
          </button>
          <LoginForm />
          <div className="flex flex-col gap-2 sm:flex-row">
            <p>Don't have an account?</p>
            <Link
              className="hover:text-primary font-semibold transition duration-250 ease-in-out"
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
