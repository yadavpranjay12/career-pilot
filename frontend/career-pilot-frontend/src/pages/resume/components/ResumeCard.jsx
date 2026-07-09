import React from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export const ResumeCard = ({
  resumes,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="lg:hidden space-y-4">

      {resumes.map((resume) => (

        <div
          key={resume.id}
          className="saas-card p-5"
        >

          <div>

            <h3 className="font-bold text-slate-900">
              {resume.title}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {resume.fileName}
            </p>

          </div>

          <div className="mt-4 text-sm text-slate-600">

            <div>
              Updated:{" "}
              {resume.updatedAt
                ? new Date(
                    resume.updatedAt
                  ).toLocaleDateString()
                : "-"}
            </div>

          </div>

          <div className="flex justify-end gap-2 mt-5">

            <button
              onClick={() => onView(resume)}
              className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
              title="View Resume"
            >
              <FiEye />
            </button>

            <button
              onClick={() => onEdit(resume)}
              className="p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
              title="Edit Resume"
            >
              <FiEdit2 />
            </button>

            <button
              onClick={() => onDelete(resume.id)}
              className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Delete Resume"
            >
              <FiTrash2 />
            </button>

          </div>

        </div>

      ))}

    </div>
  );
};