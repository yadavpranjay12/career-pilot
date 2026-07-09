import { Modal } from '../../../components/ui/Modal';
import { GoalForm } from './GoalForm';

export const GoalModal = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        initialData
          ? 'Edit Goal'
          : 'Create Goal'
      }
    >
      <GoalForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};