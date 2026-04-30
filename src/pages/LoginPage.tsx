import LoginForm from "../components/features/auth/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="w-full max-w-100 space-y-8 px-4">
      <LoginForm />
      <div className="flex flex-col gap-2 sm:flex-row">
        <p>Don't have an account?</p>
        <Link to={"/register"}>
          <p className="hover:text-primary font-semibold transition duration-500 ease-in-out">
            Register here
          </p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
