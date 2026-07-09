import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export const ApplicationDetailsModal = ({ isOpen, onClose, app }) => {
  if (!app) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Application Details">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold">{app.jobTitle}</h4>
          <StatusBadge status={app.status} />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-slate-500">Company</p><p className="font-medium">{app.companyName}</p></div>
          <div><p className="text-slate-500">Work Mode</p><p className="font-medium">{app.workMode}</p></div>
          <div><p className="text-slate-500">Applied Date</p><p className="font-medium">{app.applicationDate}</p></div>
          <div><p className="text-slate-500">Deadline</p><p className="font-medium">{app.deadline || 'N/A'}</p></div>
          <div><p className="text-slate-500">Salary</p><p className="font-medium">{app.salaryOffered ? `$${app.salaryOffered}` : 'N/A'}</p></div>
          <div><p className="text-slate-500">Location</p><p className="font-medium">{app.location || 'N/A'}</p></div>
          <div><p className="text-slate-500">Created</p><p className="font-medium">{new Date(app.createdAt).toLocaleString()}</p></div>
          <div><p className="text-slate-500">Updated</p><p className="font-medium">{new Date(app.updatedAt).toLocaleString()}</p></div>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Notes</p>
          <p className="p-3 bg-slate-50 rounded-xl text-sm italic">{app.notes || 'No notes provided.'}</p>
        </div>
        {app.applicationUrl && (
          <a href={app.applicationUrl} target="_blank" rel="noopener noreferrer" className="block text-orange-600 font-medium hover:underline">
            View Application URL
          </a>
        )}
      </div>
    </Modal>
  );
};