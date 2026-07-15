import {
  useState,
  useCallback,
} from "react";

import { ProblemService } from "../services/problem.service";
import { getUserIdFromToken } from "../utils/jwt";

export const useProblems = () => {
  const [content, setContent] = useState([]);

  const [totalPages, setTotalPages] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const fetchProblems = useCallback(
    async (
      filters = {},
      page = 0,
      sort = "updatedAt,desc"
    ) => {
      try {
        setIsLoading(true);
        setError("");

        const userId =
          getUserIdFromToken();

        const cleanedFilters =
          Object.fromEntries(
            Object.entries(filters).filter(
              ([, value]) =>
                value !== "" &&
                value !== null &&
                value !== undefined
            )
          );

        const hasFilters =
          Object.keys(cleanedFilters)
            .length > 0;

        const response = hasFilters
          ? await ProblemService.searchProblems(
              {
                userId,
                ...cleanedFilters,
                page,
                size: 10,
                sort,
              }
            )
          : await ProblemService.getProblems({
              userId,
              page,
              size: 10,
              sort,
            });

        setContent(response.content);

        setTotalPages(
          response.totalPages
        );

        setTotalElements(
          response.totalElements
        );
      } catch (err) {
        setError(
          err.response?.data?.detail ??
            "Unable to load problems."
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
    fetchProblems,
  };
};