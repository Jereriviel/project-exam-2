import type { Media } from "./media";

export interface User {
  name: string;
  email: string;
  accessToken: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager?: boolean;
}

export interface RegisterResponse {
  data: User;
  meta: Record<string, unknown>;
}

export interface LoginUser extends User {
  accessToken: string;
}

export interface LoginResponse {
  data: LoginUser;
  meta: Record<string, unknown>;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}
