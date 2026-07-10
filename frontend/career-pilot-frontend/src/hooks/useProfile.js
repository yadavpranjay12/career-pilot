import { useState, useCallback } from "react";
import { ProfileService } from "../services/profile.service";
import { getUserIdFromToken } from "../utils/jwt";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const userId = getUserIdFromToken();

      const response =
        await ProfileService.getProfile(userId);

      setProfile(response);
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null);
      } else {
        setError(
          err.response?.data?.detail ??
            "Unable to load profile."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    setProfile,
  };
};