import React from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiRefreshCw,
  FiCalendar,
} from "react-icons/fi";

export const ProblemCard = ({
  problems,
  onView,
  onEdit,
  onDelete,
  onComplete,
  onRevision,
  onSchedule,
}) => {
  const formatEnum = value =>
    value
      ?.toLowerCase()
      .split("_")
      .map(
        w =>
          w.charAt(0).toUpperCase() +
          w.slice(1)
      )
      .join(" ");

  return (
    <div className="lg:hidden space-y-4">

      {problems.map(problem => (

        <div
          key={problem.id}
          className="saas-card p-5"
        >

          <h3 className="font-bold text-lg">
            {problem.title}
          </h3>

          <div className="mt-3 space-y-1 text-sm text-slate-600">

            <div>
              Platform:{" "}
              {problem.platform || "-"}
            </div>

            <div>
              Topic:{" "}
              {formatEnum(problem.topic)}
            </div>

            <div>
              Difficulty:{" "}
              {formatEnum(
                problem.difficulty
              )}
            </div>

            <div>
              Status:{" "}
              {formatEnum(problem.status)}
            </div>

            <div>
              Revisions:{" "}
              {problem.revisionCount}
            </div>

            <div>
              Next Revision:{" "}
              {problem.nextRevisionDate ||
                "-"}
            </div>

          </div>

          <div className="flex justify-end gap-2 mt-5">

            <button
              onClick={() =>
                onView(problem)
              }
            >
              <FiEye />
            </button>

            {problem.status !== "COMPLETED" && (
    <button onClick={() => onEdit(problem)}>
      <FiEdit2 />
    </button>
  )}

            {problem.status !==
              "COMPLETED" && (
              <button
                onClick={() =>
                  onComplete(problem)
                }
              >
                <FiCheckCircle />
              </button>
            )}

            <button
              onClick={() =>
                onRevision(problem.id)
              }
            >
              <FiRefreshCw />
            </button>

            <button
              onClick={() =>
                onSchedule(problem)
              }
            >
              <FiCalendar />
            </button>

            <button
              onClick={() =>
                onDelete(problem.id)
              }
            >
              <FiTrash2 />
            </button>

          </div>

        </div>

      ))}

    </div>
  );
};