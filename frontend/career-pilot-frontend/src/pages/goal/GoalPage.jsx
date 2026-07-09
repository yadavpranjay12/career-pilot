import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { useGoals } from '../../hooks/useGoals';
import { GoalService } from '../../services/goal.service';
import { getUserIdFromToken } from '../../utils/jwt';

import { GoalTable } from './components/GoalTable';
import { GoalCard } from './components/GoalCard';
import { GoalFilters } from './components/GoalFilters';

import { GoalModal } from './components/GoalModal';
import { GoalDetailsModal } from './components/GoalDetailsModal';
import { GoalProgressModal } from './components/GoalProgressModal';

import { Pagination } from '../../components/ui/Pagination';
import { DeleteConfirmationModal } from '../../components/ui/DeleteConfirmationModal';
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from '../../components/ui/States';

export const GoalPage = () => {
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState({
    status: '',
    type: '',
  });

  const {
    content,
    totalPages,
    isLoading,
    error,
    fetchGoals,
  } = useGoals();

  const [selectedGoal, setSelectedGoal] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const [deleteData, setDeleteData] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    fetchGoals(filters, page);
  }, [fetchGoals, filters, page]);

  const refreshGoals = () => {
    fetchGoals(filters, page);
  };

  const handleSave = async (data) => {
    const payload = {
      ...data,
      targetCount: Number(data.targetCount),
      targetDate: data.targetDate || null,
    };

    if (selectedGoal) {
      await GoalService.updateGoal(selectedGoal.id, payload);
    } else {
      await GoalService.createGoal({
        ...payload,
        userId: getUserIdFromToken(),
      });
    }

    setIsFormOpen(false);
    setSelectedGoal(null);
    refreshGoals();
  };

  const handleDelete = async () => {
    await GoalService.deleteGoal(deleteData.id);

    setDeleteData({
      isOpen: false,
      id: null,
    });

    refreshGoals();
  };

  const handleUpdateProgress = async (
    goalId,
    completedCount
  ) => {
    await GoalService.updateProgress(goalId, {
      completedCount,
    });

    setIsProgressOpen(false);
    setSelectedGoal(null);

    refreshGoals();
  };

  const handleCancelGoal = async (goalId) => {
    await GoalService.cancelGoal(goalId);

    refreshGoals();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-4xl saas-heading mb-2">
            Goals
          </h1>

          <p className="text-lg saas-subheading">
            Track your career goals and progress.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedGoal(null);
            setIsFormOpen(true);
          }}
          className="saas-bg-primary px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          New Goal
        </button>

      </div>

      {/* Filters */}

      <GoalFilters
        filters={filters}
        setFilters={(newFilters) => {
          setFilters(newFilters);
          setPage(0);
        }}
      />

      {/* Content */}

      <div className="saas-card p-0 overflow-hidden border-orange-100">

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : content.length === 0 ? (
          <EmptyState message="No goals found." />
        ) : (
          <>
            <GoalTable
              goals={content}
              onView={(goal) => {
                setSelectedGoal(goal);
                setIsDetailsOpen(true);
              }}
              onEdit={(goal) => {
                setSelectedGoal(goal);
                setIsFormOpen(true);
              }}
              onUpdateProgress={(goal) => {
                setSelectedGoal(goal);
                setIsProgressOpen(true);
              }}
              onCancelGoal={handleCancelGoal}
              onDelete={(id) =>
                setDeleteData({
                  isOpen: true,
                  id,
                })
              }
            />

            <GoalCard
              goals={content}
              onView={(goal) => {
                setSelectedGoal(goal);
                setIsDetailsOpen(true);
              }}
              onEdit={(goal) => {
                setSelectedGoal(goal);
                setIsFormOpen(true);
              }}
              onUpdateProgress={(goal) => {
                setSelectedGoal(goal);
                setIsProgressOpen(true);
              }}
              onCancelGoal={handleCancelGoal}
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
            />          </>
        )}
      </div>

      {/* Create / Edit Goal */}

      <GoalModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedGoal(null);
        }}
        initialData={selectedGoal}
        onSubmit={handleSave}
      />

      {/* Goal Details */}

      <GoalDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedGoal(null);
        }}
        goal={selectedGoal}
      />

      {/* Update Progress */}

      <GoalProgressModal
        isOpen={isProgressOpen}
        onClose={() => {
          setIsProgressOpen(false);
          setSelectedGoal(null);
        }}
        goal={selectedGoal}
        onSubmit={handleUpdateProgress}
      />

      {/* Delete Confirmation */}

      <DeleteConfirmationModal
        isOpen={deleteData.isOpen}
        onClose={() =>
          setDeleteData({
            isOpen: false,
            id: null,
          })
        }
        onConfirm={handleDelete}
        title="Delete Goal"
        message="Are you sure you want to delete this goal? This action cannot be undone."
      />
    </div>
  );
};