import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";

export const CompleteProblemModal = ({
  isOpen,
  onClose,
  problem,
  onSubmit,
}) => {
  const [date, setDate] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  if (!problem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mark Problem Completed"
      size="sm"
    >
      <div className="space-y-5">

        <p>
          Mark
          <span className="font-semibold">
            {" "}
            {problem.title}
          </span>{" "}
          as completed.
        </p>

        <div>

          <label className="block text-sm font-semibold mb-2">
            Solved Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(problem.id, date)
            }
            className="px-5 py-2 rounded-xl saas-bg-primary"
          >
            Complete
          </button>

        </div>

      </div>
    </Modal>
  );
};