import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CompanyService } from '../../../services/company.service';

export const CompanyForm = ({ initialData, onSuccess, onCancel }) => {
  const isEditing = !!initialData;
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safely check both 'isHiring' and 'hiring' from the backend response
  const defaultValues = initialData ? {
    ...initialData,
    isHiring: initialData.isHiring === true || initialData.hiring === true
  } : { isHiring: false, size: '' };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      // Force boolean conversion and send BOTH property names
      const payload = { 
        ...data, 
        size: data.size === '' ? null : data.size,
        isHiring: !!data.isHiring
      };
      
      if (isEditing) {
        await CompanyService.updateCompany(initialData.id, payload);
      } else {
        await CompanyService.createCompany(payload);
      }
      onSuccess();
    } catch (error) {
      setApiError(error.response?.data?.detail || 'An error occurred while saving the company.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {apiError && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
          <input
            {...register('name', { required: 'Name is required', maxLength: 200 })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            placeholder="e.g. Google"
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
          <input
            {...register('industry', { maxLength: 100 })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            placeholder="e.g. Technology"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Size</label>
          <select
            {...register('size')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white"
          >
            <option value="">Select Size...</option>
            <option value="STARTUP">Startup</option>
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
            <option value="ENTERPRISE">Enterprise</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <input
            {...register('location', { maxLength: 150 })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            placeholder="e.g. Mountain View, CA"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            {...register('description')}
            rows="3"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none"
            placeholder="Brief description of the company..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
          <input
            {...register('website', { pattern: { value: /^(https?:\/\/).*/, message: 'Must start with http:// or https://' }})}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            placeholder="https://..."
          />
          {errors.website && <span className="text-red-500 text-xs mt-1">{errors.website.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Careers Page URL</label>
          <input
            {...register('careerPageUrl', { pattern: { value: /^(https?:\/\/).*/, message: 'Must start with http:// or https://' }})}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            placeholder="https://..."
          />
          {errors.careerPageUrl && <span className="text-red-500 text-xs mt-1">{errors.careerPageUrl.message}</span>}
        </div>
      </div>

      <div className="flex items-center py-2">
        <input
          type="checkbox"
          id="isHiring"
          {...register('isHiring')}
          className="h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
        />
        <label htmlFor="isHiring" className="ml-2 block text-sm font-medium text-slate-700">
          Actively Hiring
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 font-semibold transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 saas-bg-primary rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Company')}
        </button>
      </div>
    </form>
  );
};