import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { ApplicationForm } from './ApplicationForm';

export const ApplicationModal = ({ isOpen, onClose, initialData, companies, onSubmit, isSubmitting }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Application" : "New Application"}>
    <ApplicationForm 
      initialData={initialData} 
      companies={companies} 
      onSubmit={onSubmit} 
      onCancel={onClose} 
      isSubmitting={isSubmitting} 
    />
  </Modal>
);