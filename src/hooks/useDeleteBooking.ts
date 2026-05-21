import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../api/bookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      deleteBooking(id, token),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
};
