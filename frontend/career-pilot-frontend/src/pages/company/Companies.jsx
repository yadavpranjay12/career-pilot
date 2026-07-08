import React, { useState, useEffect } from 'react';
import { useCompanies } from '../../hooks/useCompanies';
import { CompanyService } from '../../services/company.service';
import { CompanyTable } from './components/CompanyTable';
import { CompanyCardList } from './components/CompanyCard';
import { CompanyForm } from './components/CompanyForm';
import { Pagination } from '../../components/ui/Pagination';
import { Modal } from '../../components/ui/Modal';
import { DeleteConfirmationModal } from '../../components/ui/DeleteConfirmationModal';
import { LoadingState, ErrorState } from '../../components/ui/States';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

export const Companies = () => {
  // State for pagination and filters
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ keyword: '', industry: '', size: '' });
  const [tempSearch, setTempSearch] = useState(''); // Debounce equivalent for search box
  
  // State for Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCompanyId, setDeletingCompanyId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { companies, totalPages, isLoading, error, fetchCompanies } = useCompanies();

  useEffect(() => {
    fetchCompanies(filters, page);
  }, [fetchCompanies, filters, page]);

  // Handlers for Filters
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, keyword: tempSearch }));
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(0);
  };

  // Handlers for Modals
  const handleOpenCreate = () => {
    setEditingCompany(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (company) => {
    setEditingCompany(company);
    setIsFormModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    fetchCompanies(filters, page);
  };

  const handleOpenDelete = (id) => {
    setDeletingCompanyId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingCompanyId) return;
    setIsDeleting(true);
    try {
      await CompanyService.deleteCompany(deletingCompanyId);
      setIsDeleteModalOpen(false);
      // If deleting the last item on a page, drop back a page
      if (companies.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchCompanies(filters, page);
      }
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Failed to delete company.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl saas-heading mb-2">Companies</h1>
          <p className="text-lg saas-subheading">Track and manage potential employers.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="saas-bg-primary px-5 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="saas-card p-6 border-orange-100 flex flex-col md:flex-row gap-4 items-center">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 outline-none"
            placeholder="Search by company name..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
        </form>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:w-48">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="h-4 w-4 text-slate-400" />
            </div>
            <select
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
              className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 outline-none bg-white appearance-none"
            >
              <option value="">All Sizes</option>
              <option value="STARTUP">Startup</option>
              <option value="SMALL">Small</option>
              <option value="MEDIUM">Medium</option>
              <option value="LARGE">Large</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
          </div>
          
          <input
            type="text"
            name="industry"
            placeholder="Industry..."
            value={filters.industry}
            onChange={handleFilterChange}
            className="block flex-1 md:w-48 px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="saas-card p-0 overflow-hidden border-orange-100 flex flex-col">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => fetchCompanies(filters, page)} />
        ) : (
          <>
            <CompanyTable companies={companies} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
            <CompanyCardList companies={companies} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      {/* Modals */}
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)}
        title={editingCompany ? "Edit Company" : "Add New Company"}
      >
        <CompanyForm 
          initialData={editingCompany} 
          onSuccess={handleFormSuccess} 
          onCancel={() => setIsFormModalOpen(false)} 
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Company"
        message="Are you sure you want to delete this company? This action cannot be undone."
        isDeleting={isDeleting}
      />

    </div>
  );
};