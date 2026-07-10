import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { useProfile } from "../../hooks/useProfile";
import { ProfileService } from "../../services/profile.service";
import { getUserIdFromToken } from "../../utils/jwt";

import { ProfileCard } from "./components/ProfileCard";
import { ProfileModal } from "./components/ProfileModal";

import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/ui/States";

export const ProfilePage = () => {
  const {
    profile,
    isLoading,
    error,
    fetchProfile,
  } = useProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async (data) => {
    const userId = getUserIdFromToken();

    if (profile) {
      await ProfileService.updateProfile(
        userId,
        data
      );
    } else {
      await ProfileService.createProfile({
        userId,
        ...data,
      });
    }

    setIsModalOpen(false);

    fetchProfile();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-4xl saas-heading mb-2">
            My Profile
          </h1>

          <p className="text-lg saas-subheading">
            Manage your professional information.
          </p>

        </div>

        <button
          onClick={() =>
            setIsModalOpen(true)
          }
          className="saas-bg-primary px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm"
        >
          {profile ? (
            <>
              Edit Profile
            </>
          ) : (
            <>
              <FiPlus />
              Create Profile
            </>
          )}
        </button>

      </div>

      {/* Content */}

      {!profile ? (
        <div className="saas-card py-16">

          <EmptyState message="No profile found. Create your professional profile to personalize CareerPilot." />

          <div className="flex justify-center mt-6">

            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              className="saas-bg-primary px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
            >
              <FiPlus />
              Create Profile
            </button>

          </div>

        </div>
      ) : (
        <ProfileCard
          profile={profile}
          onEdit={() =>
            setIsModalOpen(true)
          }
        />
      )}

      {/* Modal */}

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        initialData={profile}
        onSubmit={handleSave}
      />

    </div>
  );
};