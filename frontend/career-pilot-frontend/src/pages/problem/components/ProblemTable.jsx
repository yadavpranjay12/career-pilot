import React from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiRefreshCw,
  FiCalendar,
} from "react-icons/fi";

export const ProblemTable = ({
  problems,
  onView,
  onEdit,
  onDelete,
  onComplete,
  onRevision,
  onSchedule,
}) => {
  const difficultyStyles = {
    EASY: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HARD: "bg-red-100 text-red-700",
  };

  const statusStyles = {
    NOT_STARTED: "bg-slate-100 text-slate-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  const formatEnum = (value) =>
    value
      ?.toLowerCase()
      .split("_")
      .map(
        word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

  return (
    <div className="hidden lg:block overflow-x-auto">

      <table className="w-full table-fixed border-collapse">

        <thead>

          <tr className="border-b border-orange-100 saas-bg-subtle text-xs uppercase tracking-wider text-slate-500">

            <th className="w-[24%] px-6 py-4 text-left">
              Problem
            </th>

            <th className="w-[12%] text-center">
              Platform
            </th>

            <th className="w-[14%] text-center">
              Topic
            </th>

            <th className="w-[10%] text-center">
              Difficulty
            </th>

            <th className="w-[12%] text-center">
              Status
            </th>

            <th className="w-[8%] text-center">
              Revisions
            </th>

            <th className="w-[10%] text-center">
              Next Revision
            </th>

            <th className="w-[20%] px-6 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody className="divide-y divide-orange-50 bg-white">

          {problems.map(problem => (

            <tr
              key={problem.id}
              className="hover:bg-slate-50"
            >

              <td className="px-6 py-5">

                <div className="font-bold">
                  {problem.title}
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  {problem.solutionUrl
                    ? "Solution Added"
                    : "No Solution"}
                </div>

              </td>

              <td className="text-center">
                {problem.platform || "-"}
              </td>

              <td className="text-center text-sm">
                {formatEnum(problem.topic)}
              </td>

              <td className="text-center">

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    difficultyStyles[
                      problem.difficulty
                    ]
                  }`}
                >
                  {formatEnum(
                    problem.difficulty
                  )}
                </span>

              </td>

              <td className="text-center">

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusStyles[
                      problem.status
                    ]
                  }`}
                >
                  {formatEnum(problem.status)}
                </span>

              </td>

              <td className="text-center">
                {problem.revisionCount}
              </td>

              <td className="text-center text-sm">
                {problem.nextRevisionDate ||
                  "-"}
              </td>

              <td className="px-6">

                <div className="flex justify-end gap-2">

                  <button
                    onClick={() =>
                      onView(problem)
                    }
                    className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FiEye />
                  </button>

                  <button
                    onClick={() =>
                      onEdit(problem)
                    }
                    className="p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  >
                    <FiEdit2 />
                  </button>

                  {problem.status !==
                    "COMPLETED" && (
                    <button
                      onClick={() =>
                        onComplete(problem)
                      }
                      className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600"
                    >
                      <FiCheckCircle />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      onRevision(problem.id)
                    }
                    className="p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600"
                  >
                    <FiRefreshCw />
                  </button>

                  {problem.status === "COMPLETED" && (
  <button
    onClick={() => onSchedule(problem)}
    className="p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
    title="Schedule Revision"
  >
    <FiCalendar />
  </button>

)}

                  <button
                    onClick={() =>
                      onDelete(problem.id)
                    }
                    className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600"
                  >
                    <FiTrash2 />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};