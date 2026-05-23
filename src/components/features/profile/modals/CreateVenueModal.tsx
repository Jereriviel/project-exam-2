import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createVenueSchema,
  type CreateVenueRequest,
} from "../../venues/venue.schema";
import { useCreateVenue } from "../../../../hooks/useCreateVenue";
import { useAuth } from "../../../../hooks/useAuth";
import Modal from "../../../ui/Modal";
import { Field, Fieldset, Legend } from "@headlessui/react";
import Input from "../../../ui/Input";
import Textarea from "../../../ui/Textarea";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import Checkbox from "../../../ui/Checkbox";
import { ShowSuccessToast, ShowFailToast } from "../../../ui/Toast/Toast";

interface CreateVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateVenueModal = ({ isOpen, onClose }: CreateVenueModalProps) => {
  const { token } = useAuth();
  const createVenueMutation = useCreateVenue();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVenueRequest>({
    resolver: zodResolver(createVenueSchema),
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      description: "",
      media: [{ alt: "", url: "" }],
      price: 0,
      maxGuests: 1,
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
      },
    },
  });

  const handleCreateVenue = async (venueData: CreateVenueRequest) => {
    if (!token) {
      ShowFailToast("You must be logged in to create a venue");
      return;
    }

    createVenueMutation.mutate(
      { data: venueData, token },
      {
        onSuccess: () => {
          ShowSuccessToast("Venue successfully created");
          reset();
          onClose();
        },
        onError: (error) => {
          ShowFailToast(`Creating venue failed: ${error.message}`);
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
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={`Create New Venue`}
      >
        <form
          className="min-w-86"
          id="create-venue-form"
          onSubmit={handleSubmit(handleCreateVenue)}
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
                type="button"
                className="btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn-primary flex h-12 min-w-35 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {createVenueMutation.isPending ? (
                  <LoadingSpinner />
                ) : (
                  "Create Venue"
                )}
              </button>
            </Field>
          </Fieldset>
        </form>
      </Modal>
    </>
  );
};

export default CreateVenueModal;
