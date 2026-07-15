import React, {
  useEffect,
  useState,
} from "react";

import { FiPlus } from "react-icons/fi";

import { useProblems } from "../../hooks/useProblems";
import { ProblemService } from "../../services/problem.service";
import { getUserIdFromToken } from "../../utils/jwt";

import { ProblemTable } from "./components/ProblemTable";
import { ProblemCard } from "./components/ProblemCard";
import { ProblemFilters } from "./components/ProblemFilters";
import { ProblemModal } from "./components/ProblemModal";
import { ProblemDetailsModal } from "./components/ProblemDetailsModal";
import { CompleteProblemModal } from "./components/CompleteProblemModal";
import { RevisionModal } from "./components/RevisionModal";

import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/ui/States";

export const ProblemPage = () => {
  const {
    content,
    totalPages,
    totalElements,
    isLoading,
    error,
    fetchProblems,
  } = useProblems();

  const [filters, setFilters] = useState({
    keyword: "",
    topic: "",
    difficulty: "",
    status: "",
  });

  const [page, setPage] = useState(0);

  const [selectedProblem, setSelectedProblem] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showComplete, setShowComplete] =
    useState(false);

  const [showRevision, setShowRevision] =
    useState(false);

  useEffect(() => {
    fetchProblems(filters, page);
  }, [filters, page, fetchProblems]);

  const handleCreateOrUpdate = async (
    data
  ) => {
    if (selectedProblem) {
      await ProblemService.updateProblem(
        selectedProblem.id,
        data
      );
    } else {
      await ProblemService.createProblem({
        userId: getUserIdFromToken(),
        ...data,
      });
    }

    setShowModal(false);
    setSelectedProblem(null);

    fetchProblems(filters, page);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this problem?"
      )
    )
      return;

    await ProblemService.deleteProblem(id);

    fetchProblems(filters, page);
  };

const handleComplete = async (id, solvedDate) => {
  try {
    await ProblemService.markCompleted(id, solvedDate);

    setShowComplete(false);
    setSelectedProblem(null);

    fetchProblems(filters, page);
  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.detail ??
      "Unable to mark problem as completed."
    );
  }
};

  const handleRevision = async (id) => {
    await ProblemService.incrementRevision(
      id
    );

    fetchProblems(filters, page);
  };

  const handleSchedule = async (
    id,
    nextRevisionDate
  ) => {
    await ProblemService.scheduleRevision(
      id,
      nextRevisionDate
    );

    setShowRevision(false);
    setSelectedProblem(null);

    fetchProblems(filters, page);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState message={error} />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h1 className="text-4xl saas-heading">
            DSA Problems
          </h1>

          <p className="saas-subheading mt-2">
            Track solved problems,
            revisions and progress.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedProblem(null);
            setShowModal(true);
          }}
          className="saas-bg-primary px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold"
        >
          <FiPlus />
          Add Problem
        </button>

      </div>

      {/* Filters */}

      <ProblemFilters
        filters={filters}
        setFilters={setFilters}
      />
            {/* Empty State */}

      {content.length === 0 ? (
        <div className="saas-card py-16">
          <EmptyState message="No DSA problems found. Start by adding your first problem." />

          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                setSelectedProblem(null);
                setShowModal(true);
              }}
              className="saas-bg-primary px-6 py-3 rounded-2xl font-semibold flex items-center gap-2"
            >
              <FiPlus />
              Add Problem
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <ProblemTable
            problems={content}
            onView={(problem) => {
              setSelectedProblem(problem);
              setShowDetails(true);
            }}
            onEdit={(problem) => {
              setSelectedProblem(problem);
              setShowModal(true);
            }}
            onDelete={handleDelete}
            onComplete={(problem) => {
              setSelectedProblem(problem);
              setShowComplete(true);
            }}
            onRevision={handleRevision}
            onSchedule={(problem) => {
              setSelectedProblem(problem);
              setShowRevision(true);
            }}
          />

            {/* Mobile Cards */}

          <ProblemCard
            problems={content}
            onView={(problem) => {
              setSelectedProblem(problem);
              setShowDetails(true);
            }}
            onEdit={(problem) => {
              setSelectedProblem(problem);
              setShowModal(true);
            }}
            onDelete={handleDelete}
            onComplete={(problem) => {
              setSelectedProblem(problem);
              setShowComplete(true);
            }}
            onRevision={handleRevision}
            onSchedule={(problem) => {
              setSelectedProblem(problem);
              setShowRevision(true);
            }}
          />
        </>
      )}

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">

          <button
            disabled={page === 0}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="px-4 py-2 rounded-xl border disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="px-4 py-2 rounded-xl border disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

      {/* Create / Edit */}

      <ProblemModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProblem(null);
        }}
        initialData={selectedProblem}
        onSubmit={handleCreateOrUpdate}
      />

      {/* Details */}

      <ProblemDetailsModal
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedProblem(null);
        }}
        problem={selectedProblem}
      />

      {/* Complete */}

      <CompleteProblemModal
        isOpen={showComplete}
        onClose={() => {
          setShowComplete(false);
          setSelectedProblem(null);
        }}
        problem={selectedProblem}
        onSubmit={handleComplete}
      />

      {/* Revision */}

      <RevisionModal
        isOpen={showRevision}
        onClose={() => {
          setShowRevision(false);
          setSelectedProblem(null);
        }}
        problem={selectedProblem}
        onSubmit={handleSchedule}
      />

    </div>
  );
};