import { get, post, put, del } from "./api";
import type {
  Booking,
  BookingsResponse,
  SingleBookingResponse,
  CreateBookingRequest,
  UpdateBookingRequest,
} from "../types/booking";

export const getBookings = async (): Promise<BookingsResponse> => {
  const endpoint = `/holidaze/bookings?_customer=true&_venue=true`;
  const data = await get<BookingsResponse>(endpoint);

  if (!data) {
    throw new Error("No data received from server");
  }

  return data;
};

export const getBookingById = async (
  id: string,
): Promise<SingleBookingResponse> => {
  const endpoint = `/holidaze/bookings/${id}?_customer=true&_venue=true`;
  const data = await get<SingleBookingResponse>(endpoint);

  if (!data) {
    throw new Error("No data received from server");
  }

  return data;
};

export const createBooking = async (
  postData: CreateBookingRequest,
  token: string | null = null,
): Promise<Booking> => {
  const endpoint = `/holidaze/bookings`;
  const response = await post<{ data: Booking }>(endpoint, postData, token);

  if (!response?.data) throw new Error("Booking was not created");

  return response.data;
};

export const updateBooking = async (
  id: string,
  putData: UpdateBookingRequest,
  token: string | null = null,
): Promise<Booking> => {
  const endpoint = `/holidaze/bookings/${id}`;
  const response = await put<{ data: Booking }>(endpoint, putData, token);

  if (!response?.data) throw new Error("Booking was not updated");

  return response.data;
};

export const deleteBooking = async (
  id: string,
  token: string | null = null,
): Promise<void> => {
  await del(`/holidaze/bookings/${id}`, token);
};
