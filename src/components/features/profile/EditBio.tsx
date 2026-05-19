import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bioSchema, type BioRequest } from "./profile.schema";
import type { Profile } from "../../../types/profile";
import { Field, Fieldset } from "@headlessui/react";
import Textarea from "../../ui/Textarea";
import LoadingSpinner from "../../ui/LoadingSpinner";

interface EditBioProps {
  profile: Profile;
  onSave: (bio: string) => void;
  isUpdating: boolean;
}

const EditBio = ({ profile, onSave, isUpdating }: EditBioProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BioRequest>({
    resolver: zodResolver(bioSchema),
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      bio: profile.bio || "",
    },
  });

  const onSubmit = (data: BioRequest) => {
    onSave(data.bio || "");
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex w-full flex-col gap-4 lg:w-fit lg:flex-row lg:items-end">
        <div className="flex flex-col">
          <h3>About</h3>
          <p>{profile.bio || "No bio added yet."}</p>
        </div>

        <button
          type="button"
          className="btn-primary-round"
          onClick={() => setIsEditing(true)}
        >
          <span className="iconify-[material-symbols--edit-outline] size-5"></span>
        </button>
      </div>
    );
  }

  return (
    <form id="bio-form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="flex flex-col gap-4">
        <Field>
          <Textarea
            label="About"
            placeholder="Tell us about you!"
            error={errors.bio?.message}
            {...register("bio")}
          ></Textarea>
        </Field>
        <Field>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              className={`btn-primary-sm flex h-10 items-center justify-center ${
                isSubmitting || isUpdating
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              type="submit"
              disabled={isSubmitting || isUpdating}
            >
              {isSubmitting || isUpdating ? <LoadingSpinner /> : "Save Changes"}
            </button>

            <button
              type="button"
              className="btn-secondary-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </Field>
      </Fieldset>
    </form>
  );
};

export default EditBio;
