import { useState, useCallback } from "react";
import { ResumeService } from "../services/resume.service";
import { getUserIdFromToken } from "../utils/jwt";

export const useResumes = () => {
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResumes = useCallback(
    async (
      page = 0,
      sort = "updatedAt,desc"
    ) => {
      try {
        setIsLoading(true);
        setError("");

        const userId = getUserIdFromToken();

        const response =
          await ResumeService.getResumes({
            userId,
            page,
            size: 10,
            sort,
          });

        setContent(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (err) {
        setError(
          err.response?.data?.detail ??
          "Unable to load resumes."
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    content,
    totalPages,
    totalElements,
    isLoading,
    error,
    fetchResumes,
  };
};