import React from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export const ResumeTable = ({
  resumes,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full table-fixed border-collapse">

        <thead>
          <tr className="border-b border-orange-100 saas-bg-subtle text-xs uppercase tracking-wider text-slate-500">

            <th className="w-[55%] px-6 py-4 text-left rounded-tl-3xl">
              Resume
            </th>

            <th className="w-[20%] text-center">
              Updated
            </th>

            <th className="w-[25%] px-6 text-right rounded-tr-3xl">
              Actions
            </th>

          </tr>
        </thead>

        <tbody className="divide-y divide-orange-50 bg-white">

          {resumes.map((resume) => (

            <tr
              key={resume.id}
              className="hover:bg-slate-50 transition-colors"
            >

              <td className="px-6 py-5">

                <div className="font-bold text-slate-900">
                  {resume.title}
                </div>

                <p className="text-xs text-slate-500 mt-1 truncate">
                  {resume.fileName}
                </p>

              </td>

              <td className="text-center text-sm text-slate-600">
                {resume.updatedAt
                  ? new Date(
                      resume.updatedAt
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-6">

                <div className="flex justify-end gap-2">

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

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
};