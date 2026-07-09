import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const ResumeForm = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData
      ? {
          title: initialData.title,
          fileName: initialData.fileName,
          fileUrl: initialData.fileUrl,
        }
      : {
          title: "",
          fileName: "",
          fileUrl: "",
        },
  });

  const submit = async (data) => {
    setIsSubmitting(true);

    await onSubmit(data);

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-semibold mb-2">
          Resume Title
        </label>

        <input
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 200,
              message: "Maximum 200 characters",
            },
          })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          File Name
        </label>

        <input
          {...register("fileName", {
            required: "File name is required",
          })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        {errors.fileName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fileName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Resume URL
        </label>

        <input
          {...register("fileUrl", {
            required: "Resume URL is required",
            pattern: {
              value: /^https?:\/\/.+/,
              message:
                "Must begin with http:// or https://",
            },
          })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        {errors.fileUrl && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fileUrl.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 rounded-xl saas-bg-primary text-white font-semibold"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Save Changes"
            : "Create Resume"}
        </button>
      </div>
    </form>
  );
};