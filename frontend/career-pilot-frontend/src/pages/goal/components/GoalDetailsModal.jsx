import { Modal } from '../../../components/ui/Modal';
import { GoalStatusBadge } from './GoalStatusBadge';

export const GoalDetailsModal = ({
  isOpen,
  onClose,
  goal,
}) => {

  if (!goal) return null;

  const percentage =
    goal.targetCount > 0
      ? Math.round(
          (goal.completedCount /
            goal.targetCount) *
            100
        )
      : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Goal Details"
    >
      <div className="space-y-5">

        <div>

          <h2 className="text-xl font-bold">
            {goal.title}
          </h2>

          <div className="mt-2">
            <GoalStatusBadge
              status={goal.status}
            />
          </div>

        </div>

        <div>

          <div className="flex justify-between text-sm mb-2">
            <span>
              {goal.completedCount}/
              {goal.targetCount}
            </span>

            <span>{percentage}%</span>
          </div>

          <div className="bg-slate-200 rounded-full h-2">

            <div
              className={`h-2 rounded-full ${
                goal.status === 'COMPLETED'
                  ? 'bg-green-500'
                  : 'bg-orange-500'
              }`}
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>

            <strong>Type</strong>

            <p>{goal.type}</p>

          </div>

          <div>

            <strong>Target Date</strong>

            <p>
              {goal.targetDate || '-'}
            </p>

          </div>

          <div>

            <strong>Created</strong>

            <p>
              {goal.createdAt
                ? new Date(
                    goal.createdAt
                  ).toLocaleDateString()
                : '-'}
            </p>

          </div>

          <div>

            <strong>Updated</strong>

            <p>
              {goal.updatedAt
                ? new Date(
                    goal.updatedAt
                  ).toLocaleDateString()
                : '-'}
            </p>

          </div>

        </div>

        {goal.description && (
          <div>

            <strong>Description</strong>

            <div className="mt-2 p-4 bg-slate-50 rounded-xl">
              {goal.description}
            </div>

          </div>
        )}

        <div className="flex justify-end">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 rounded-xl"
          >
            Close
          </button>

        </div>

      </div>
    </Modal>
  );
};