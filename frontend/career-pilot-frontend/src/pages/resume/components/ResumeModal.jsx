import { Modal } from "../../../components/ui/Modal";
import { ResumeForm } from "./ResumeForm";

export const ResumeModal = ({
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
          ? "Edit Resume"
          : "Create Resume"
      }
    >
      <ResumeForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};