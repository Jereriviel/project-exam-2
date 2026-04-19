import type { Media } from "./media";

export interface AuthUser {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager?: boolean;
}

export interface RegisterResponse {
  data: AuthUser;
  meta: Record<string, unknown>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser extends AuthUser {
  accessToken?: string;
}

export interface LoginResponse {
  data: {
    name: string;
    email: string;
    avatar?: Media;
    banner?: Media;
    accessToken: string;
    venueManager?: boolean;
  };
  meta: Record<string, unknown>;
}
