import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterRequest } from "./auth.schema";
import { Field, Fieldset, Legend } from "@headlessui/react";
import Input from "../../ui/Input";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ShowSuccessToast from "../../ui/Toast";
import ErrorModal from "../../ui/ErrorModal";
import { ApiError } from "../../../error/ApiError";
import { registerUser, loginUser } from "../../../api/auth";
import { useAuth } from "../../../hooks/useAuth";

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUser(data);

      const loginResponse = await loginUser({
        email: data.email,
        password: data.password,
      });

      login(loginResponse.data.accessToken, loginResponse.data);
      ShowSuccessToast("Registration successful!");
      navigate("/");
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error);
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
      <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset
          className={`flex flex-col gap-8 ${isSubmitting ? "opacity-50" : ""}`}
          disabled={isSubmitting}
        >
          <Legend className="text-2xl font-semibold">
            Register your account
          </Legend>
          <div className="flex flex-col gap-5">
            <Input
              label="Username"
              placeholder="Enter username"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              placeholder="Enter your email address"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
              type="password"
              {...register("password")}
            />
            <Input
              label="Confirm Password"
              placeholder="Re-enter password"
              error={errors.confirmPassword?.message}
              type="password"
              {...register("confirmPassword")}
            />
            <Field>
              <button
                className={`btn-primary mt-4 flex h-12 items-center justify-center sm:w-21.5 ${
                  isSubmitting ? "cursor-not-allowed opacity-50" : ""
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingSpinner /> : "Register"}
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

export default RegisterForm;
