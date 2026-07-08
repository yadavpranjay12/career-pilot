import React from 'react';
import { FiX } from 'react-icons/fi';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-orange-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-orange-50">
          <h3 className="text-xl saas-heading">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};