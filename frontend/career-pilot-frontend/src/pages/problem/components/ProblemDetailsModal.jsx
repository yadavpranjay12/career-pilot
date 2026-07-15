import { Modal } from "../../../components/ui/Modal";

const formatEnum = (value) =>
  value
    ?.toLowerCase()
    .split("_")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

export const ProblemDetailsModal = ({
  isOpen,
  onClose,
  problem,
}) => {
  if (!problem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Problem Details"
      size="lg"
    >
      <div className="space-y-6">

        <div>
          <h2 className="text-2xl font-bold">
            {problem.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <Info
            label="Platform"
            value={problem.platform || "-"}
          />

          <Info
            label="Topic"
            value={formatEnum(problem.topic)}
          />

          <Info
            label="Difficulty"
            value={formatEnum(problem.difficulty)}
          />

          <Info
            label="Status"
            value={formatEnum(problem.status)}
          />

          <Info
            label="Solved Date"
            value={problem.solvedDate || "-"}
          />

          <Info
            label="Revision Count"
            value={problem.revisionCount}
          />

          <Info
            label="Next Revision"
            value={
              problem.nextRevisionDate || "-"
            }
          />

        </div>

        {problem.notes && (
          <div>

            <h3 className="font-semibold mb-2">
              Notes
            </h3>

            <div className="saas-card p-4 whitespace-pre-wrap">
              {problem.notes}
            </div>

          </div>
        )}

        {problem.solutionUrl && (
          <div>

            <a
              href={problem.solutionUrl}
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 hover:underline font-semibold"
            >
              Open Solution
            </a>

          </div>
        )}

      </div>
    </Modal>
  );
};

const Info = ({
  label,
  value,
}) => (
  <div className="saas-card p-4">
    <div className="text-xs uppercase text-slate-500">
      {label}
    </div>

    <div className="font-semibold mt-1">
      {value}
    </div>
  </div>
);