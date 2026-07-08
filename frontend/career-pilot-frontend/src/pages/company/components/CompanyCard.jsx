import React from 'react';
import { FiEdit2, FiTrash2, FiMapPin, FiBriefcase, FiExternalLink } from 'react-icons/fi';
import { EmptyState } from '../../../components/ui/States';

export const CompanyCardList = ({ companies, onEdit, onDelete }) => {
  if (!companies || companies.length === 0) {
    return <div className="lg:hidden"><EmptyState message="No companies found." /></div>;
  }

  return (
    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
      {companies.map((company) => (
        <div key={company.id} className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                {company.isHiring && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    Hiring
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-1">
               <button onClick={() => onEdit(company)} className="p-1.5 text-slate-400 hover:text-orange-600 rounded-lg bg-slate-50">
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(company.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg bg-slate-50">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-600 mb-4">
            {company.industry && (
              <div className="flex items-center">
                <FiBriefcase className="w-4 h-4 mr-2 text-slate-400" />
                {company.industry} {company.size && `• ${company.size}`}
              </div>
            )}
            {company.location && (
              <div className="flex items-center">
                <FiMapPin className="w-4 h-4 mr-2 text-slate-400" />
                {company.location}
              </div>
            )}
          </div>

          {(company.website || company.careerPageUrl) && (
            <div className="flex gap-3 pt-3 border-t border-slate-100 text-sm">
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-medium hover:underline flex items-center">
                  Website <FiExternalLink className="ml-1 w-3 h-3" />
                </a>
              )}
              {company.careerPageUrl && (
                <a href={company.careerPageUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-medium hover:underline flex items-center">
                  Careers <FiExternalLink className="ml-1 w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};