import { careerApi } from "./api";

export const ProblemService = {
  getProblems: async (params) => {
    const response = await careerApi.get(
      "/api/problems",
      { params }
    );
    return response.data;
  },

  searchProblems: async (params) => {
    const response = await careerApi.get(
      "/api/problems/search",
      { params }
    );
    return response.data;
  },

  getProblem: async (id) => {
    const response = await careerApi.get(
      `/api/problems/${id}`
    );
    return response.data;
  },

  createProblem: async (data) => {
    const response = await careerApi.post(
      "/api/problems",
      data
    );
    return response.data;
  },

  updateProblem: async (id, data) => {
    const response = await careerApi.put(
      `/api/problems/${id}`,
      data
    );
    return response.data;
  },

  deleteProblem: async (id) => {
    await careerApi.delete(
      `/api/problems/${id}`
    );
  },

  markCompleted: async (id, solvedDate) => {
    const response = await careerApi.post(
      `/api/problems/${id}/complete`,
      {
        solvedDate,
      }
    );

    return response.data;
  },

  incrementRevision: async (id) => {
    const response = await careerApi.post(
      `/api/problems/${id}/revisions`
    );

    return response.data;
  },

  scheduleRevision: async (
    id,
    nextRevisionDate
  )=> {
    const response = await careerApi.put(
      `/api/problems/${id}/next-revision`,
      {
        nextRevisionDate,
      }
    );

    return response.data;
  },
};