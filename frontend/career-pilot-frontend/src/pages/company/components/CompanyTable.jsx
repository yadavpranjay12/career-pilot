import React from 'react';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { EmptyState } from '../../../components/ui/States';

export const CompanyTable = ({ companies, onEdit, onDelete }) => {
  if (!companies || companies.length === 0) {
    return <EmptyState message="No companies found matching your criteria." />;
  }

  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-orange-100 text-xs uppercase tracking-wider text-slate-500 saas-bg-subtle">
            <th className="px-6 py-4 font-semibold rounded-tl-3xl">Company</th>
            <th className="px-6 py-4 font-semibold">Industry</th>
            <th className="px-6 py-4 font-semibold">Size</th>
            <th className="px-6 py-4 font-semibold">Location</th>
            <th className="px-6 py-4 font-semibold text-center">Status</th>
            <th className="px-6 py-4 font-semibold text-right rounded-tr-3xl">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-50 bg-white">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900">{company.name}</div>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 hover:underline flex items-center mt-1">
                    Website <FiExternalLink className="ml-1 w-3 h-3" />
                  </a>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{company.industry || '-'}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{company.size || '-'}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{company.location || '-'}</td>
              <td className="px-6 py-4 text-center">
                {company.isHiring ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Hiring
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(company)}
                    className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Edit Company"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(company.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Company"
                  >
                    <FiTrash2 className="w-4 h-4" />
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