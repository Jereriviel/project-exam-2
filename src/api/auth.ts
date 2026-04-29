import { post } from "./api";
import type {
  LoginRequest,
  RegisterRequest,
} from "../components/features/auth/auth.schema";
import type { LoginResponse, RegisterResponse } from "../types/auth";

export const loginUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  return (await post<LoginResponse>(
    "/auth/login",
    credentials,
  )) as LoginResponse;
};

export const registerUser = async (
  userData: RegisterRequest,
): Promise<RegisterResponse> => {
  return (await post<RegisterResponse>(
    "/auth/register",
    userData,
  )) as LoginResponse;
};
