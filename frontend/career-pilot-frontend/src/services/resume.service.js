import { careerApi } from "./api";

export const ResumeService = {
  getResumes: async (params) => {
    const response = await careerApi.get("/api/resumes", {
      params,
    });
    return response.data;
  },

  getResume: async (id) => {
    const response = await careerApi.get(`/api/resumes/${id}`);
    return response.data;
  },

  createResume: async (data) => {
    const response = await careerApi.post("/api/resumes", data);
    return response.data;
  },

  updateResume: async (id, data) => {
    const response = await careerApi.put(
      `/api/resumes/${id}`,
      data
    );
    return response.data;
  },

  deleteResume: async (id) => {
    await careerApi.delete(`/api/resumes/${id}`);
  },
};