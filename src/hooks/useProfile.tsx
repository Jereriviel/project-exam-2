import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "../api/profile";
import { useAuth } from "./useAuth";

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.name],

    queryFn: () => getProfileById(user!.name, user!.accessToken),

    enabled: !!user?.name && !!user?.accessToken,
  });
}
