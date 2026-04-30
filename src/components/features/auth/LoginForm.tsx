import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginRequest } from "./auth.schema";
import { Field, Fieldset, Legend } from "@headlessui/react";
import { useAuth } from "../../../hooks/useAuth";
import Input from "../../ui/Input";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ShowSuccessToast from "../../ui/Toast";
import ErrorModal from "../../ui/ErrorModal";
import { ApiError } from "../../../error/ApiError";
import { loginUser } from "../../../api/auth";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await loginUser(data);
      login(response.data.accessToken, response.data);
      ShowSuccessToast("Logged in successfully!");
      navigate("/");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          setApiError(
            new ApiError(401, "Unauthorized", "Invalid email or password"),
          );
        } else {
          setApiError(error);
        }
      } else {
        setApiError(
          new ApiError(500, "Server Error", "An unexpected error occurred"),
        );
      }
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset
          id="contact-fieldset"
          className={`flex flex-col gap-8 ${isSubmitting ? "opacity-50" : ""}`}
          disabled={isSubmitting}
        >
          <Legend className="text-2xl font-semibold">
            Log in to your account
          </Legend>
          <div className="flex flex-col gap-5">
            <Input
              label="Email"
              placeholder="Enter your email address"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              type="password"
              {...register("password")}
            />
            <Field>
              <button
                className={`btn-primary mt-4 flex h-12 items-center justify-center sm:w-21.5 ${
                  isSubmitting ? "cursor-not-allowed opacity-50" : ""
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingSpinner /> : "Log in"}
              </button>
            </Field>
          </div>
        </Fieldset>
      </form>

      <ErrorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        error={apiError}
      />
    </>
  );
};

export default LoginForm;
