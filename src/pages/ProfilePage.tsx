import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import type { Profile, UpdateProfileRequest } from "../types/profile";
import {
  getProfileById,
  updateProfile,
  getVenuesByProfile,
} from "../api/profile";
import { ApiError } from "../error/ApiError";
import ErrorModal from "../components/ui/ErrorModal";
import Container from "../layouts/Container";
import { Helmet } from "react-helmet-async";
import ProfileHeader from "../components/features/profile/ProfileHeader";
import { ShowSuccessToast, ShowFailToast } from "../components/ui/Toast/Toast";
import type { Media } from "../types/media";
import ProfileBookings from "../components/features/profile/ProfileBookings";
import ProfileVenues from "../components/features/profile/ProfileVenues";
import ProfileHeaderSkeleton from "../components/features/profile/loading-skeletons/ProfileHeaderSkeleton";
import ProfileCardSkeleton from "../components/features/profile/loading-skeletons/ProfileCardSkeleton";

function ProfilePage() {
  const navigate = useNavigate();
  const [isModalClosed, setIsModalClosed] = useState(false);
  const { user, token, isLoading: isAuthLoading } = useAuth();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      updateProfile(user!.name, data, token),

    onSuccess: (updatedProfile, variables) => {
      queryClient.setQueryData(
        ["profile", user?.name],
        (oldProfile: Profile | undefined) => {
          if (!oldProfile) return updatedProfile;

          return {
            ...oldProfile,
            ...updatedProfile,
          };
        },
      );

      if (variables.venueManager !== undefined) {
        ShowSuccessToast(
          variables.venueManager
            ? "You are now a venue manager!"
            : "You are now a customer.",
        );
      }

      if (variables.bio !== undefined) {
        ShowSuccessToast("Bio updated successfully!");
      }

      if (variables.avatar !== undefined) {
        ShowSuccessToast("Profile image updated successfully!");
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

  const { data: profileVenues } = useQuery({
    queryKey: ["profileVenues", user?.name],
    queryFn: () => getVenuesByProfile(user!.name, token!),
    enabled: !!user,
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
      <>
        <ProfileHeaderSkeleton />
        <Container>
          <div className="flex flex-col gap-12 pb-12">
            <ProfileCardSkeleton />
            <ProfileCardSkeleton />
          </div>
        </Container>
      </>
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

  const handleUpdateBio = (bio: string) => {
    updateProfileMutation.mutate({
      bio,
    });
  };

  const handleUpdateAvatar = (avatar: Media) => {
    updateProfileMutation.mutate({
      avatar,
    });
  };

  console.log(profileVenues);

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
        onUpdateBio={handleUpdateBio}
        onUpdateAvatar={handleUpdateAvatar}
        isUpdating={updateProfileMutation.isPending}
      />
      <Container>
        <div className="flex flex-col gap-12 pb-12">
          <ProfileBookings bookings={profile.bookings || []} />
          {profile.venueManager && (
            <ProfileVenues venues={profileVenues?.data || []} />
          )}
        </div>
      </Container>

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
