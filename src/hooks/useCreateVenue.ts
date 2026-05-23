import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVenue } from "../api/venues";
import type { CreateVenueRequest } from "../components/features/venues/venue.schema";

export const useCreateVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: CreateVenueRequest;
      token: string;
    }) => createVenue(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
