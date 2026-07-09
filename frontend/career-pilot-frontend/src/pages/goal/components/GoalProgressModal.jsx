import { Modal } from '../../../components/ui/Modal';
import { useForm } from 'react-hook-form';

export const GoalProgressModal = ({
  isOpen,
  onClose,
  goal,
  onSubmit,
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      completedCount:
        goal?.completedCount ?? 0,
    },
  });

  if (!goal) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Progress"
    >
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(goal.id, Number(data.completedCount))
        )}
        className="space-y-5"
      >

        <div>

          <label className="block text-sm font-medium mb-1">
            Completed Count
          </label>

          <input
            type="number"
            {...register('completedCount', {
              required: true,
              min: 0,
              max: goal.targetCount,
              valueAsNumber: true,
            })}
            className="w-full border rounded-xl p-3"
          />

          {errors.completedCount && (
            <p className="text-red-500 text-sm">
              Must be between 0 and{' '}
              {goal.targetCount}
            </p>
          )}

        </div>

        <button className="w-full saas-bg-primary rounded-xl py-3 font-semibold">
          Update Progress
        </button>

      </form>
    </Modal>
  );
};