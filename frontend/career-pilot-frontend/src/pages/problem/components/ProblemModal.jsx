import { Modal } from "../../../components/ui/Modal";
import { ProblemForm } from "./ProblemForm";

export const ProblemModal = ({
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
          ? "Edit Problem"
          : "Create Problem"
      }
    >
      <ProblemForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};