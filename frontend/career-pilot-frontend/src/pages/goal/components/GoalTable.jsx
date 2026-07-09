import React from "react";
import {
  FiEdit2,
  FiEye,
  FiTrash2,
  FiTrendingUp,
  FiXCircle,
} from "react-icons/fi";

import { GoalStatusBadge } from "./GoalStatusBadge";

export const GoalTable = ({
  goals,
  onView,
  onEdit,
  onDelete,
  onUpdateProgress,
  onCancelGoal,
}) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full table-fixed text-left border-collapse">

        <thead>
          <tr className="border-b border-orange-100 text-xs uppercase tracking-wider text-slate-500 saas-bg-subtle">

            <th className="w-[30%] px-6 py-4 font-semibold rounded-tl-3xl">
              Goal
            </th>

            <th className="w-[12%] px-4 py-4 text-center font-semibold">
              Type
            </th>

            <th className="w-[14%] px-4 py-4 text-center font-semibold">
              Status
            </th>

            <th className="w-[24%] px-6 py-4 font-semibold">
              Progress
            </th>

            <th className="w-[12%] px-4 py-4 text-center font-semibold whitespace-nowrap">
              Target Date
            </th>

            <th className="w-[12%] px-4 py-4 text-center font-semibold rounded-tr-3xl">
              Actions
            </th>

          </tr>
        </thead>

        <tbody className="divide-y divide-orange-50 bg-white">

          {goals.map((goal) => {

            const percentage =
              goal.targetCount > 0
                ? Math.min(
                    Math.round(
                      (goal.completedCount / goal.targetCount) * 100
                    ),
                    100
                  )
                : 0;

            return (
              <tr
                key={goal.id}
                className="hover:bg-slate-50 transition-colors"
              >

                {/* Goal */}

                <td className="px-6 py-5">

                  <div className="font-bold text-slate-900">
                    {goal.title}
                  </div>

                  {goal.description && (
                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {goal.description}
                    </p>
                  )}

                </td>

                {/* Type */}

                <td className="px-4 py-5 text-center text-sm text-slate-600">
                  {goal.type}
                </td>

                {/* Status */}

                <td className="px-4 py-5 text-center">
                  <GoalStatusBadge status={goal.status} />
                </td>

                {/* Progress */}

                <td className="px-6 py-5">

                  <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-2">

                    <span>
                      {goal.completedCount}/{goal.targetCount}
                    </span>

                    <span>
                      {percentage}%
                    </span>

                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        goal.status === "COMPLETED"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </td>

                {/* Target Date */}

                <td className="px-4 py-5 text-center whitespace-nowrap text-sm text-slate-600">
                  {goal.targetDate || "-"}
                </td>

                {/* Actions */}

                <td className="px-4 py-5">

       <div className="flex justify-center items-center gap-1.5">

                    <button
                      onClick={() => onView(goal)}
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit(goal)}
                      className="p-2 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    {goal.status === "ACTIVE" && (
                      <>
                        <button
                          onClick={() => onUpdateProgress(goal)}
                          className="p-2 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                          title="Update Progress"
                        >
                          <FiTrendingUp />
                        </button>

                        <button
                          onClick={() => onCancelGoal(goal.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                          title="Cancel Goal"
                        >
                          <FiXCircle />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => onDelete(goal.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </td>

              </tr>
            );

          })}

        </tbody>

      </table>
    </div>
  );
};