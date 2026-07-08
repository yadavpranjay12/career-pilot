import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 border border-red-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <FiAlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg saas-heading text-center mb-2">{title}</h3>
        <p className="text-slate-500 text-center text-sm mb-6">{message}</p>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-colors disabled:opacity-50 flex justify-center items-center"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};