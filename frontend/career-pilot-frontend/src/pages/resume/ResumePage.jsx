import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { useResumes } from "../../hooks/useResumes";
import { ResumeService } from "../../services/resume.service";
import { getUserIdFromToken } from "../../utils/jwt";

import { ResumeTable } from "./components/ResumeTable";
import { ResumeCard } from "./components/ResumeCard";
import { ResumeModal } from "./components/ResumeModal";
import { ResumeDetailsModal } from "./components/ResumeDetailsModal";

import { Pagination } from "../../components/ui/Pagination";
import { DeleteConfirmationModal } from "../../components/ui/DeleteConfirmationModal";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/ui/States";

export const ResumePage = () => {
  const [page, setPage] = useState(0);

  const {
    content,
    totalPages,
    isLoading,
    error,
    fetchResumes,
  } = useResumes();

  const [selectedResume, setSelectedResume] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [deleteData, setDeleteData] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    fetchResumes(page);
  }, [fetchResumes, page]);

  const refreshResumes = () => {
    fetchResumes(page);
  };

  const handleSave = async (data) => {
    const payload = {
      ...data,
    };

    if (selectedResume) {
      await ResumeService.updateResume(
        selectedResume.id,
        payload
      );
    } else {
      await ResumeService.createResume({
        ...payload,
        userId: getUserIdFromToken(),
      });
    }

    setSelectedResume(null);
    setIsFormOpen(false);

    refreshResumes();
  };

  const handleDelete = async () => {
    await ResumeService.deleteResume(deleteData.id);

    setDeleteData({
      isOpen: false,
      id: null,
    });

    refreshResumes();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-4xl saas-heading mb-2">
            Resume Management
          </h1>

          <p className="text-lg saas-subheading">
            Manage your resumes for internship applications.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedResume(null);
            setIsFormOpen(true);
          }}
          className="saas-bg-primary px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          New Resume
        </button>

      </div>

      {/* Content */}

      <div className="saas-card p-0 overflow-hidden border-orange-100">

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : content.length === 0 ? (
          <EmptyState message="No resumes found." />
        ) : (
          <>
            <ResumeTable
              resumes={content}
              onView={(resume) => {
                setSelectedResume(resume);
                setIsDetailsOpen(true);
              }}
              onEdit={(resume) => {
                setSelectedResume(resume);
                setIsFormOpen(true);
              }}
              onDelete={(id) =>
                setDeleteData({
                  isOpen: true,
                  id,
                })
              }
            />

            <ResumeCard
              resumes={content}
              onView={(resume) => {
                setSelectedResume(resume);
                setIsDetailsOpen(true);
              }}
              onEdit={(resume) => {
                setSelectedResume(resume);
                setIsFormOpen(true);
              }}
              onDelete={(id) =>
                setDeleteData({
                  isOpen: true,
                  id,
                })
              }
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

      </div>

      {/* Create / Edit */}

      <ResumeModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedResume(null);
        }}
        initialData={selectedResume}
        onSubmit={handleSave}
      />

      {/* Details */}

      <ResumeDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedResume(null);
        }}
        resume={selectedResume}
      />

      {/* Delete */}

      <DeleteConfirmationModal
        isOpen={deleteData.isOpen}
        onClose={() =>
          setDeleteData({
            isOpen: false,
            id: null,
          })
        }
        onConfirm={handleDelete}
        title="Delete Resume"
        message="Are you sure you want to delete this resume? This action cannot be undone."
      />

    </div>
  );
};