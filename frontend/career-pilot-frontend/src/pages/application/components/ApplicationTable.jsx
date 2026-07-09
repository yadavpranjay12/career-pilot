import React from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { EmptyState } from '../../../components/ui/States';

export const ApplicationTable = ({ applications, onEdit, onView, onDelete }) => {
  // Added check to handle empty state explicitly within the table component
  if (!applications || applications.length === 0) {
    return (
      <div className="p-12">
        <EmptyState message="No applications found." />
      </div>
    );
  }

  return (
    <div className="hidden lg:block overflow-x-auto min-h-[300px]">
      <table className="w-full text-left">
        <thead className="bg-orange-50/50 text-slate-500 text-xs uppercase">
          <tr>
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-50">
          {applications.map(app => (
            <tr key={app.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold">{app.companyName}</td>
              <td className="px-6 py-4">{app.jobTitle}</td>
              <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <button onClick={() => onView(app)} className="p-2 text-slate-400 hover:text-blue-600"><FiEye /></button>
                <button onClick={() => onEdit(app)} className="p-2 text-slate-400 hover:text-orange-600"><FiEdit2 /></button>
                <button onClick={() => onDelete(app.id)} className="p-2 text-slate-400 hover:text-red-600"><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};