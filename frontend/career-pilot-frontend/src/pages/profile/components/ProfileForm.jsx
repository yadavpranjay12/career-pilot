import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const ProfileForm = ({
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
    defaultValues: initialData || {
      headline: "",
      bio: "",
      location: "",
      targetRole: "",
      yearsOfExperience: 0,
      phoneNumber: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
    },
  });

  const submit = async (data) => {
    setIsSubmitting(true);

    data.yearsOfExperience = Number(
      data.yearsOfExperience
    );

    await onSubmit(data);

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >

      {/* Headline */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Headline
        </label>

        <input
          {...register("headline", {
            maxLength: 200,
          })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        {errors.headline && (
          <p className="text-red-500 text-sm mt-1">
            Maximum 200 characters
          </p>
        )}
      </div>

      {/* Bio */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Bio
        </label>

        <textarea
          rows={4}
          {...register("bio", {
            maxLength: 2000,
          })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 resize-none"
        />

        {errors.bio && (
          <p className="text-red-500 text-sm mt-1">
            Maximum 2000 characters
          </p>
        )}
      </div>

      {/* Location */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Location
        </label>

        <input
          {...register("location")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* Target Role */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Target Role
        </label>

        <input
          {...register("targetRole")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* Experience */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Years of Experience
        </label>

        <input
          type="number"
          min="0"
          max="60"
          {...register("yearsOfExperience")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* Phone */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Phone Number
        </label>

        <input
          {...register("phoneNumber")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* LinkedIn */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          LinkedIn URL
        </label>

        <input
          {...register("linkedinUrl")}
          placeholder="https://linkedin.com/in/..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* GitHub */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          GitHub URL
        </label>

        <input
          {...register("githubUrl")}
          placeholder="https://github.com/..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* Portfolio */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Portfolio URL
        </label>

        <input
          {...register("portfolioUrl")}
          placeholder="https://..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200"
        >
          Cancel
        </button>

        <button
          disabled={isSubmitting}
          className="px-5 py-2 rounded-xl saas-bg-primary font-semibold"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Save Changes"
            : "Create Profile"}
        </button>

      </div>

    </form>
  );
};