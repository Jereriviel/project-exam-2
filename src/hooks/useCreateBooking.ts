import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../api/bookings";
import type { CreateBookingRequest } from "../types/booking";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: CreateBookingRequest;
      token: string;
    }) => createBooking(data, token),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({
        queryKey: ["venue", variables.data.venueId],
      });
    },
  });
};
