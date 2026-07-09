import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const ApplicationForm = ({ initialData, companies = [], onSubmit, onCancel }) => {
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = initialData || {
    status: 'SAVED',
    workMode: 'ONSITE',
    // Default to today in YYYY-MM-DD format for the HTML input
    applicationDate: new Date().toISOString().split('T')[0], 
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  // Helper to prevent Date parsing crashes in Spring Boot
  const formatDateForBackend = (dateStr) => {
    if (!dateStr) return null;
    if (dateStr.includes('T')) return dateStr; // Already formatted
    return `${dateStr}T00:00:00`; // Append time for LocalDateTime compatibility
  };

const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      const parsedSalary = data.salaryOffered ? parseFloat(data.salaryOffered) : null;
      
      const appDate = data.applicationDate ? data.applicationDate.split('T')[0] : null;
      const deadDate = data.deadline ? data.deadline.split('T')[0] : null;

      const payload = {
        // FIX: Keep the companyId as the raw UUID string from the dropdown!
        companyId: data.companyId ? data.companyId : null,
        
        jobTitle: data.jobTitle?.trim(),
        applicationUrl: data.applicationUrl?.trim() || null,
        applicationDate: appDate,
        deadline: deadDate,
        status: data.status || 'SAVED',
        workMode: data.workMode || 'ONSITE',
        location: data.location?.trim() || null,
        salaryOffered: isNaN(parsedSalary) ? null : parsedSalary,
        notes: data.notes?.trim() || null,
      };
      
      await onSubmit(payload);
    } catch (error) {
      const backendMessage = error.response?.data?.detail || error.response?.data?.message || 'Invalid data. Check Spring Boot console.';
      setApiError(`Error: ${backendMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {apiError && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Company *</label>
          <select {...register('companyId', { required: true })} className="w-full mt-1 p-2 border rounded-xl outline-none bg-white">
            <option value="">Select Company...</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {errors.companyId && <span className="text-red-500 text-xs mt-1">Company is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Job Title *</label>
          <input {...register('jobTitle', { required: true })} className="w-full mt-1 p-2 border rounded-xl outline-none" />
          {errors.jobTitle && <span className="text-red-500 text-xs mt-1">Job title is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Application URL</label>
          <input type="url" {...register('applicationUrl')} className="w-full mt-1 p-2 border rounded-xl outline-none" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium">App Date *</label>
          <input type="date" {...register('applicationDate', { required: true })} className="w-full mt-1 p-2 border rounded-xl outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <input type="date" {...register('deadline')} className="w-full mt-1 p-2 border rounded-xl outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register('status')} className="w-full mt-1 p-2 border rounded-xl outline-none bg-white">
            {['SAVED','APPLIED','OA_RECEIVED','OA_COMPLETED','INTERVIEW','OFFER','REJECTED','WITHDRAWN'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Work Mode</label>
          <select {...register('workMode')} className="w-full mt-1 p-2 border rounded-xl outline-none bg-white">
            <option value="REMOTE">REMOTE</option>
            <option value="HYBRID">HYBRID</option>
            <option value="ONSITE">ONSITE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input {...register('location')} className="w-full mt-1 p-2 border rounded-xl outline-none" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium">Salary</label>
          <input type="number" {...register('salaryOffered')} className="w-full mt-1 p-2 border rounded-xl outline-none" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium">Notes</label>
          <textarea {...register('notes')} className="w-full mt-1 p-2 border rounded-xl outline-none resize-none" rows="3" />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-6 py-2.5 bg-slate-100 rounded-xl font-semibold">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 saas-bg-primary rounded-xl font-semibold">
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};