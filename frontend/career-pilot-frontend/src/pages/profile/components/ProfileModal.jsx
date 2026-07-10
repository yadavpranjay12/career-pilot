import { Modal } from "../../../components/ui/Modal";
import { ProfileForm } from "./ProfileForm";

export const ProfileModal = ({
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
          ? "Edit Profile"
          : "Create Profile"
      }
    >
      <ProfileForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};