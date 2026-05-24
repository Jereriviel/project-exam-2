import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { avatarSchema, type AvatarRequest } from "../profile.schema";
import Modal from "../../../ui/Modal";
import type { Profile } from "../../../../types/profile";
import avatarFallbackImg from "../../../../assets/avatar-fallback-img.jpg";
import { Field, Fieldset } from "@headlessui/react";
import Input from "../../../ui/Input";
import LoadingSpinner from "../../../ui/LoadingSpinner";

interface EditAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (avatar: AvatarRequest) => void;
  isUpdating: boolean;
}

const EditAvatarModal = ({
  isOpen,
  onClose,
  profile,
  onSave,
  isUpdating,
}: EditAvatarModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AvatarRequest>({
    resolver: zodResolver(avatarSchema),
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      url: profile.avatar?.url || "",
      alt: profile.avatar?.alt || "",
    },
  });

  const onSubmit = (data: AvatarRequest) => {
    onSave(data);
    onClose();
  };

  const imageUrl = watch("url");
  const imageAlt = watch("alt");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Profile Picture`}>
      <div className="flex justify-center">
        <img
          className="size-36 rounded-full object-cover lg:size-40"
          src={imageUrl || avatarFallbackImg}
          alt={imageAlt || "Profile avatar"}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarFallbackImg;
          }}
        />
      </div>
      <form id="avatar-form" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="flex flex-col gap-4">
          <Field>
            <Input
              label="Image URL"
              placeholder="Ex: https://picsum.photos/seed/picsum/200/300 !"
              error={errors.url?.message}
              {...register("url")}
            ></Input>
          </Field>
          <Field>
            <Input
              label="Image alt text"
              placeholder="Enter description of the image"
              error={errors.alt?.message}
              {...register("alt")}
            ></Input>
          </Field>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <button
              aria-label="Cancel"
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              aria-label="Save Changes"
              type="submit"
              className={`btn-primary flex h-12 items-center justify-center ${
                isSubmitting || isUpdating
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={isSubmitting || isUpdating}
            >
              {isSubmitting || isUpdating ? <LoadingSpinner /> : "Save Changes"}
            </button>
          </div>
        </Fieldset>
      </form>
    </Modal>
  );
};

export default EditAvatarModal;
