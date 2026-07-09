import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export const GoalForm = ({
  initialData,
  onSubmit,
  onCancel,
}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      targetCount: 1,
      targetDate: '',
      type: 'DSA',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        targetDate: initialData.targetDate || '',
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div>

        <label className="block text-sm font-medium mb-1">
          Goal Title *
        </label>

        <input
          {...register('title', {
            required: 'Title is required',
            maxLength: 200,
          })}
          className="w-full border rounded-xl p-3"
        />

        {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}

      </div>

      <div>

        <label className="block text-sm font-medium mb-1">
          Description
        </label>

        <textarea
          rows={4}
          {...register('description')}
          className="w-full border rounded-xl p-3 resize-none"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label className="block text-sm font-medium mb-1">
            Target Count *
          </label>

          <input
            type="number"
            {...register('targetCount', {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Goal Type
          </label>

          <select
            {...register('type')}
            className="w-full border rounded-xl p-3"
          >
            <option value="DSA">DSA</option>
            <option value="INTERNSHIP">
              Internship
            </option>
            <option value="RESUME">
              Resume
            </option>
            <option value="INTERVIEW">
              Interview
            </option>
          </select>

        </div>

      </div>

      <div>

        <label className="block text-sm font-medium mb-1">
          Target Date
        </label>

        <input
          type="date"
          {...register('targetDate')}
          className="w-full border rounded-xl p-3"
        />

      </div>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-xl bg-slate-100"
        >
          Cancel
        </button>

        <button
          disabled={isSubmitting}
          className="saas-bg-primary px-5 py-2 rounded-xl font-semibold"
        >
          {initialData ? 'Update Goal' : 'Create Goal'}
        </button>

      </div>

    </form>
  );
};