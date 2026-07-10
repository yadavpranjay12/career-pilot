import { careerApi } from "./api";

export const ProfileService = {
  getProfile: async (userId) => {
    const response = await careerApi.get(
      `/api/profiles/${userId}`
    );
    return response.data;
  },

  createProfile: async (data) => {
    const response = await careerApi.post(
      "/api/profiles",
      data
    );
    return response.data;
  },

  updateProfile: async (userId, data) => {
    const response = await careerApi.put(
      `/api/profiles/${userId}`,
      data
    );
    return response.data;
  },
};