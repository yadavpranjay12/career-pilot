import React from 'react';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export const ApplicationCardList = ({ applications, onEdit, onView, onDelete }) => (
  <div className="lg:hidden p-4 space-y-4">
    {applications.map(app => (
      <div key={app.id} className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{app.companyName}</h3>
            <p className="text-sm text-slate-600">{app.jobTitle}</p>
          </div>
          <StatusBadge status={app.status} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => onView(app)} className="p-2 border rounded-lg"><FiEye /></button>
          <button onClick={() => onEdit(app)} className="p-2 border rounded-lg"><FiEdit2 /></button>
          <button onClick={() => onDelete(app.id)} className="p-2 border rounded-lg text-red-600"><FiTrash2 /></button>
        </div>
      </div>
    ))}
  </div>
);