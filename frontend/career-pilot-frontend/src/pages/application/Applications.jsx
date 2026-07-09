import React, { useState, useEffect } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { ApplicationService } from '../../services/application.service';
import { CompanyService } from '../../services/company.service';
import { ApplicationTable } from './components/ApplicationTable';
import { ApplicationCardList } from './components/ApplicationCard';
import { ApplicationModal } from './components/ApplicationModal';
import { ApplicationDetailsModal } from './components/ApplicationDetailsModal';
import { Pagination } from '../../components/ui/Pagination';
import { DeleteConfirmationModal } from '../../components/ui/DeleteConfirmationModal';
import { LoadingState, ErrorState } from '../../components/ui/States';
import { FiPlus } from 'react-icons/fi';
// Add this import at the top with your other imports
import { getUserIdFromToken } from '../../utils/jwt';
export const Applications = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ companyName: '', status: '' });
  const [companies, setCompanies] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [deleteData, setDeleteData] = useState({ isOpen: false, id: null });

  const { content, totalPages, isLoading, error, fetchApplications } = useApplications();

  useEffect(() => {
    fetchApplications(filters, page);
    CompanyService.searchCompanies({}).then(res => {
      if (res && res.content) setCompanies(res.content);
    }).catch(err => console.error("Failed to load companies dropdown", err));
  }, [fetchApplications, filters, page]);
const handleSave = async (cleanData) => {
    try {
      // FIX: Use the exact same token function as your useApplications hook!
      const realUserId = getUserIdFromToken();

      const payload = {
        ...cleanData,
        userId: realUserId 
      };

      if (selectedApp) {
        await ApplicationService.updateApplication(selectedApp.id, payload);
      } else {
        await ApplicationService.createApplication(payload);
      }
      
      setIsFormOpen(false);
      fetchApplications(filters, page);
    } catch (err) {
      console.error("Save failed", err.response?.data || err);
      throw err; 
    }
  };
  const handleDelete = async () => {
    await ApplicationService.deleteApplication(deleteData.id);
    setDeleteData({ isOpen: false, id: null });
    fetchApplications(filters, page);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl saas-heading mb-2">Applications</h1>
          <p className="text-lg saas-subheading">Track your internship hunt.</p>
        </div>
        <button 
          onClick={() => { setSelectedApp(null); setIsFormOpen(true); }} 
          className="saas-bg-primary px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm"
        >
          <FiPlus /> New Application
        </button>
      </div>

      <div className="saas-card p-6 border-orange-100 flex flex-col md:flex-row gap-4">
        <input 
          placeholder="Search company..." 
          className="flex-1 p-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-orange-200" 
          onChange={(e) => setFilters({...filters, companyName: e.target.value})} 
        />
        <select 
          className="p-2.5 border rounded-xl outline-none" 
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">All Statuses</option>
          {['SAVED', 'APPLIED', 'OA_RECEIVED', 'OA_COMPLETED', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="saas-card p-0 overflow-hidden border-orange-100">
        {isLoading ? <LoadingState /> : error ? <ErrorState message={error} /> : (
          <>
            <ApplicationTable 
                applications={content} 
                onEdit={(app) => { setSelectedApp(app); setIsFormOpen(true); }} 
                onView={(app) => { setSelectedApp(app); setIsDetailsOpen(true); }}
                onDelete={(id) => setDeleteData({isOpen: true, id})} 
            />
            <ApplicationCardList 
                applications={content} 
                onEdit={(app) => { setSelectedApp(app); setIsFormOpen(true); }}
                onView={(app) => { setSelectedApp(app); setIsDetailsOpen(true); }}
                onDelete={(id) => setDeleteData({isOpen: true, id})} 
            />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      <ApplicationModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} initialData={selectedApp} companies={companies} onSubmit={handleSave} />
      <ApplicationDetailsModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} app={selectedApp} />
      <DeleteConfirmationModal isOpen={deleteData.isOpen} onClose={() => setDeleteData({isOpen: false, id: null})} onConfirm={handleDelete} title="Delete Application" message="Confirm deletion?" />
    </div>
  );
};