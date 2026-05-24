import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateVenueSchema,
  type UpdateVenueRequest,
} from "../../venues/venue.schema";
import { useEditVenue } from "../../../../hooks/useEditVenue";
import { useDeleteVenue } from "../../../../hooks/useDeleteVenue";
import { useAuth } from "../../../../hooks/useAuth";
import Modal from "../../../ui/Modal";
import { Field, Fieldset, Legend } from "@headlessui/react";
import Input from "../../../ui/Input";
import Textarea from "../../../ui/Textarea";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import Checkbox from "../../../ui/Checkbox";
import { ShowSuccessToast, ShowFailToast } from "../../../ui/Toast/Toast";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import type { ProfileVenueSummary } from "../../../../types/profile";

interface EditVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: ProfileVenueSummary;
}

const EditVenueModal = ({ isOpen, onClose, venue }: EditVenueModalProps) => {
  const { token } = useAuth();
  const editVenueMutation = useEditVenue();
  const deleteVenueMutation = useDeleteVenue();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateVenueRequest>({
    resolver: zodResolver(updateVenueSchema),
    mode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    if (venue && isOpen) {
      reset({
        name: venue.name ?? "",
        description: venue.description ?? "",
        media: venue.media?.length ? venue.media : [{ url: "", alt: "" }],
        price: venue.price ?? 0,
        maxGuests: venue.maxGuests ?? 1,
        meta: {
          wifi: venue.meta?.wifi ?? false,
          parking: venue.meta?.parking ?? false,
          breakfast: venue.meta?.breakfast ?? false,
          pets: venue.meta?.pets ?? false,
        },
        location: {
          address: venue.location?.address ?? "",
          city: venue.location?.city ?? "",
          zip: venue.location?.zip ?? "",
          country: venue.location?.country ?? "",
        },
      });
    }
  }, [venue, isOpen, reset]);

  const handleSaveChanges = async (venueData: UpdateVenueRequest) => {
    if (!token) {
      ShowFailToast("You must be logged in to edit a venue");
      return;
    }

    editVenueMutation.mutate(
      { id: venue.id, data: venueData, token },
      {
        onSuccess: () => {
          ShowSuccessToast("Venue successfully updated");
          reset();
          onClose();
        },
        onError: (error) => {
          ShowFailToast(`Updating venue failed: ${error.message}`);
        },
      },
    );
  };

  const handleDeleteVenue = () => {
    if (!token) {
      ShowFailToast("You must be logged in");
      return;
    }

    deleteVenueMutation.mutate(
      {
        id: venue.id,
        token,
      },
      {
        onSuccess: () => {
          ShowSuccessToast("Venue deleted successfully");
          setIsDeleteModalOpen(false);
          onClose();
        },
        onError: (error) => {
          ShowFailToast(`Delete failed: ${error.message}`);
        },
      },
    );
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseModal} title={`Edit Venue`}>
        <form
          className="min-w-86"
          id="edit-venue-form"
          onSubmit={handleSubmit(handleSaveChanges)}
        >
          <Fieldset
            className={`flex flex-col gap-8 ${isSubmitting ? "opacity-50" : ""}`}
            disabled={isSubmitting}
          >
            <Legend className="bg-primary-light rounded-t-xl px-4 py-2 text-xl font-semibold">
              About
            </Legend>
            <div className="flex flex-col gap-6">
              <Input
                label="Name"
                placeholder="Enter the name of the venue"
                error={errors.name?.message}
                {...register("name")}
              ></Input>
              <Textarea
                label="Description"
                placeholder="Enter a description of the venue"
                error={errors.description?.message}
                {...register("description")}
              ></Textarea>
              <div className="flex flex-col gap-6 lg:flex-row">
                <Input
                  type="number"
                  label="Guests"
                  placeholder="Enter max no. of guests"
                  error={errors.maxGuests?.message}
                  {...register("maxGuests", { valueAsNumber: true })}
                ></Input>
                <Input
                  type="number"
                  label="Price per night"
                  placeholder="Ex: 1200 NOK"
                  error={errors.price?.message}
                  {...register("price", { valueAsNumber: true })}
                ></Input>
              </div>
              <Input
                label="Venue image URL"
                placeholder="Ex: https://picsum.photos/seed/picsum/200/300 "
                error={errors.media?.[0]?.url?.message}
                {...register("media.0.url")}
              ></Input>
              <Input
                label="Venue image alt text"
                placeholder="Enter a description of the venue"
                error={errors.media?.[0]?.alt?.message}
                {...register("media.0.alt")}
              ></Input>
            </div>
            <Legend className="bg-primary-light rounded-t-xl px-4 py-2 text-xl font-semibold">
              Location
            </Legend>
            <div className="flex flex-col gap-6">
              <Input
                label="Address"
                placeholder="Enter address"
                error={errors.location?.address?.message}
                {...register("location.address")}
              ></Input>
              <div className="flex flex-col gap-6 lg:flex-row">
                <Input
                  label="City"
                  placeholder="Enter city"
                  error={errors.location?.city?.message}
                  {...register("location.city")}
                ></Input>
                <Input
                  label="Zip code"
                  placeholder="Ex: 123456"
                  error={errors.location?.zip?.message}
                  {...register("location.zip")}
                ></Input>
              </div>
              <Input
                label="Country"
                placeholder="Enter country"
                error={errors.location?.country?.message}
                {...register("location.country")}
              ></Input>
            </div>
            <Legend className="bg-primary-light rounded-t-xl px-4 py-2 text-xl font-semibold">
              Amenities
            </Legend>
            <Field className="flex flex-col gap-4 lg:flex-row">
              <div className="flex flex-col gap-4">
                <Checkbox
                  iconClass="iconify-[material-symbols--local-dining]"
                  amenityName="Breakfast"
                  {...register("meta.breakfast")}
                />
                <Checkbox
                  iconClass="iconify-[material-symbols--local-parking]"
                  amenityName="Parking"
                  {...register("meta.parking")}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Checkbox
                  iconClass="iconify-[material-symbols--android-wifi-3-bar]"
                  amenityName="Wifi"
                  {...register("meta.wifi")}
                />
                <Checkbox
                  iconClass="iconify-[material-symbols--pets]"
                  amenityName="Pets"
                  {...register("meta.pets")}
                />
              </div>
            </Field>
            <Field className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between">
              <button
                aria-label="Delete Venue"
                type="button"
                className="btn-delete flex h-12 items-center justify-center"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete Venue
              </button>
              <button
                aria-label="Save Changes"
                type="submit"
                className="btn-primary flex h-12 min-w-36 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                {editVenueMutation.isPending ? (
                  <LoadingSpinner />
                ) : (
                  "Save Changes"
                )}
              </button>
            </Field>
          </Fieldset>
        </form>
      </Modal>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteVenue}
        isLoading={deleteVenueMutation.isPending}
        title="Delete Venue?"
        message="Are you sure you want to delete this venue?"
        confirmText="Yes, Delete Venue"
      />
    </>
  );
};

export default EditVenueModal;
