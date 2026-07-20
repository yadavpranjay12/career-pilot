import {
  FiEdit2,
  FiEye,
  FiTrash2,
  FiTrendingUp,
  FiXCircle,
} from "react-icons/fi";

import { GoalStatusBadge } from "./GoalStatusBadge";

export const GoalCard = ({
  goals,
  onView,
  onEdit,
  onDelete,
  onUpdateProgress,
  onCancelGoal,
}) => {
  return (
    <div className="lg:hidden space-y-4">

      {goals.map((goal) => {

        const percentage =
          goal.targetCount > 0
            ? Math.min(
                Math.round(
                  (goal.completedCount /
                    goal.targetCount) *
                    100
                ),
                100
              )
            : 0;

        return (
          <div
            key={goal.id}
            className="saas-card p-5"
          >
            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-bold">
                  {goal.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {goal.type}
                </p>

              </div>

              <GoalStatusBadge
                status={goal.status}
              />

            </div>

            <div className="mt-5">

              <div className="flex justify-between text-xs mb-2">

                <span>
                  {goal.completedCount}/
                  {goal.targetCount}
                </span>

                <span>{percentage}%</span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-2">

                <div
                  className={`h-2 rounded-full ${
                    goal.status === "COMPLETED"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

           <div className="flex justify-end gap-4 mt-5">
  {/* View Button: Always visible */}
  <button onClick={() => onView(goal)}>
    <FiEye />
  </button>

  {/* Pen/Edit Button: Removed if Completed or Cancelled */}
  {goal.status === "ACTIVE" && (
    <button onClick={() => onEdit(goal)}>
      <FiEdit2 />
    </button>
  )}

  {/* Progress and Cancel Buttons: Removed if Completed or Cancelled */}
  {goal.status === "ACTIVE" && (
    <>
      <button onClick={() => onUpdateProgress(goal)}>
        <FiTrendingUp />
      </button>
      <button onClick={() => onCancelGoal(goal.id)}>
        <FiXCircle />
      </button>
    </>
  )}

  {/* Delete Button: Always visible */}
  <button onClick={() => onDelete(goal.id)}>
    <FiTrash2 />
  </button>
</div>

          </div>
        );
      })}
    </div>
  );
};