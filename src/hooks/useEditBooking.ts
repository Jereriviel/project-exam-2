import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../api/bookings";
import type { UpdateBookingRequest } from "../types/booking";

export const useEditBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      token,
    }: {
      id: string;
      data: UpdateBookingRequest;
      token: string;
    }) => updateBooking(id, data, token),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({
        queryKey: ["venue", variables.id],
      });
    },
  });
};
