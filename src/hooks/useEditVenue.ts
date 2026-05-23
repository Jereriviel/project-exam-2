import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVenue } from "../api/venues";
import type { UpdateVenueRequest } from "../components/features/venues/venue.schema";

export const useEditVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      token,
    }: {
      id: string;
      data: UpdateVenueRequest;
      token: string;
    }) => updateVenue(id, data, token),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({
        queryKey: ["venue", variables.id],
      });
    },
  });
};
