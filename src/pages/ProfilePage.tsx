import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import type { Profile, UpdateProfileRequest } from "../types/profile";
import { getProfileById, updateProfile } from "../api/profile";
import { ApiError } from "../error/ApiError";
import ErrorModal from "../components/ui/ErrorModal";
import Container from "../layouts/Container";
import { Helmet } from "react-helmet-async";
import ProfileHeader from "../components/features/profile/ProfileHeader";
import { ShowSuccessToast, ShowFailToast } from "../components/ui/Toast/Toast";

function ProfilePage() {
  const navigate = useNavigate();
  const [isModalClosed, setIsModalClosed] = useState(false);
  const { user, token, isLoading: isAuthLoading } = useAuth();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      updateProfile(user!.name, data, token),

    onSuccess: (updatedProfile, variables) => {
      queryClient.setQueryData(["profile", user?.name], updatedProfile);

      if (variables.venueManager !== undefined) {
        ShowSuccessToast(
          variables.venueManager
            ? "You are now a venue manager!"
            : "You are now a customer.",
        );
      }
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        ShowFailToast(error.message);
      } else {
        ShowFailToast("An unexpected error occurred.");
      }
    },
  });

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery<Profile>({
    queryKey: ["profile", user?.name],
    queryFn: () => getProfileById(user!.name, token!),
    enabled: !!user && !!token && !isAuthLoading,
  });

  useEffect(() => {
    if (isError && error instanceof ApiError && error.statusCode === 404) {
      navigate("/404");
    }
  }, [isError, error, navigate]);

  if (isAuthLoading) {
    return null;
  }

  if (!user || !token) {
    return null;
  }

  const apiError =
    error instanceof ApiError
      ? error
      : new ApiError(500, "Server Error", "An unexpected error occurred");

  const showModal = isError && apiError.statusCode !== 404 && !isModalClosed;

  if (isLoading) {
    return (
      <Container>
        <div className="pt-4">
          <div className="fade-in">ProfilePageSkeleton</div>
        </div>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <p className="py-4 font-semibold">Profile not found.</p>
      </Container>
    );
  }

  const handleToggleVenueManager = () => {
    updateProfileMutation.mutate({
      venueManager: !profile.venueManager,
    });
  };

  return (
    <>
      <Helmet>
        <title>Holidaze | Profile</title>
        <meta
          name="description"
          content="Look at you details in your profile page."
        />
      </Helmet>

      <ProfileHeader
        profile={profile}
        onToggleVenueManager={handleToggleVenueManager}
        isUpdating={updateProfileMutation.isPending}
      />

      <ErrorModal
        isOpen={showModal}
        onClose={() => {
          setIsModalClosed(true);
          navigate("/");
        }}
        error={showModal ? apiError : null}
      />
    </>
  );
}

export default ProfilePage;
