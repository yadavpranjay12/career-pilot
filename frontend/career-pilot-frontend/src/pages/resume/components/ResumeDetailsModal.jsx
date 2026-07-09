import { Modal } from "../../../components/ui/Modal";

export const ResumeDetailsModal = ({
  isOpen,
  onClose,
  resume,
}) => {
  if (!resume) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume Details"
      size="md"
    >
      <div className="space-y-5">

        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            {resume.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="saas-card p-4">
            <p className="text-xs uppercase text-slate-500">
              File Name
            </p>

            <p className="mt-1 font-medium">
              {resume.fileName}
            </p>
          </div>

          <div className="saas-card p-4">
            <p className="text-xs uppercase text-slate-500">
              Last Updated
            </p>

            <p className="mt-1 font-medium">
              {resume.updatedAt
                ? new Date(
                    resume.updatedAt
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>

        </div>

        <div>
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold hover:underline"
          >
            Open Resume
          </a>
        </div>

      </div>
    </Modal>
  );
};