import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Booking, UpdateBookingRequest } from "../../../../types/booking";
import type { Venue } from "../../../../types/venue";
import { BookingCalendar } from "../../bookings/BookingCalendar";
import BookingTotalNights from "../../bookings/BookingTotalNights";
import GuestSelector from "../../bookings/GuestSelector";
import { useAuth } from "../../../../hooks/useAuth";
import { useEditBooking } from "../../../../hooks/useEditBooking";
import { ShowSuccessToast, ShowFailToast } from "../../../ui/Toast/Toast";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { parseISO, startOfDay, format, addDays } from "date-fns";
import { useMemo } from "react";
import Modal from "../../../ui/Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useDeleteBooking } from "../../../../hooks/useDeleteBooking";

interface EditBookingModalProps {
  booking?: Booking;
  venue?: Venue;
  isOpen: boolean;
  onClose: () => void;
}

const EditBookingModal = ({
  booking,
  venue,
  isOpen,
  onClose,
}: EditBookingModalProps) => {
  const [selectedGuests, setSelectedGuests] = useState(booking?.guests ?? 1);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: booking?.dateFrom ? new Date(booking.dateFrom) : undefined,
    to: booking?.dateTo ? new Date(booking.dateTo) : undefined,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteBookingMutation = useDeleteBooking();

  const editBookingMutation = useEditBooking();

  const { token } = useAuth();

  const blockedDates = useMemo(() => {
    return (
      venue?.bookings
        ?.filter((b) => b.id !== booking?.id)
        .map((b) => ({
          from: startOfDay(parseISO(b.dateFrom)),
          to: startOfDay(parseISO(b.dateTo)),
        })) ?? []
    );
  }, [venue?.bookings, booking?.id]);

  const tomorrow = addDays(startOfDay(new Date()), 1);

  const [month, setMonth] = useState<Date>(() => {
    return booking?.dateFrom ? new Date(booking.dateFrom) : new Date();
  });

  const resetFormState = () => {
    setSelectedGuests(booking?.guests ?? 1);

    setDateRange({
      from: booking?.dateFrom ? parseISO(booking.dateFrom) : undefined,
      to: booking?.dateTo ? parseISO(booking.dateTo) : undefined,
    });

    setMonth(booking?.dateFrom ? parseISO(booking.dateFrom) : new Date());
  };

  if (!booking || !venue) return null;

  const isBookingDisabled =
    !dateRange.from || !dateRange.to || editBookingMutation.isPending;

  const handleDeleteBooking = () => {
    if (!token) {
      ShowFailToast("You must be logged in");
      return;
    }

    deleteBookingMutation.mutate(
      {
        id: booking.id,
        token,
      },
      {
        onSuccess: () => {
          ShowSuccessToast("Booking deleted successfully");
          setIsDeleteModalOpen(false);
          resetFormState();
          onClose();
        },
        onError: (error) => {
          ShowFailToast(`Delete failed: ${error.message}`);
        },
      },
    );
  };

  const handleSaveChanges = async () => {
    if (!token) {
      ShowFailToast("You must be logged in to book a venue");
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      ShowFailToast("Please select both start and end dates");
      return;
    }

    const bookingData: UpdateBookingRequest = {
      dateFrom: format(dateRange.from, "yyyy-MM-dd"),
      dateTo: format(dateRange.to, "yyyy-MM-dd"),
      guests: selectedGuests,
    };

    editBookingMutation.mutate(
      { id: booking.id, data: bookingData, token },
      {
        onSuccess: () => {
          ShowSuccessToast("Booking updated successfully");
          resetFormState();
          onClose();
        },
        onError: (error) => {
          ShowFailToast(`Booking update failed: ${error.message}`);
        },
      },
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetFormState();
          onClose();
        }}
        title={`Edit Booking`}
      >
        <div className="flex w-full flex-col items-center gap-4 rounded-xl">
          <BookingCalendar
            selected={dateRange}
            onDateChange={(range) => {
              if (range) {
                setDateRange(range);
              }
            }}
            disabledDates={blockedDates}
            month={month}
            onMonthChange={setMonth}
            minDate={tomorrow}
          />
          <GuestSelector
            guests={selectedGuests}
            maxGuests={venue?.maxGuests}
            onChange={(count) => setSelectedGuests(count)}
          />
          <BookingTotalNights
            dateRange={dateRange}
            pricePerNight={venue?.price}
          />
          <div className="flex w-full flex-col gap-4">
            <button
              className="btn-delete flex h-12 min-w-full items-center justify-center"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Booking
            </button>
            <button
              className="btn-primary flex h-12 min-w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSaveChanges}
              disabled={isBookingDisabled}
            >
              {editBookingMutation.isPending ? (
                <LoadingSpinner />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteBooking}
        isLoading={deleteBookingMutation.isPending}
        title="Delete Booking?"
        message="Are you sure you want to delete this booking?"
        confirmText="Yes, Delete Booking"
      />
    </>
  );
};

export default EditBookingModal;
