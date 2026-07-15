import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TOPICS = [
  "ARRAYS",
  "STRINGS",
  "HASHING",
  "TWO_POINTERS",
  "SLIDING_WINDOW",
  "PREFIX_SUM",
  "BINARY_SEARCH",
  "SORTING",
  "LINKED_LIST",
  "STACK",
  "QUEUE",
  "HEAP",
  "PRIORITY_QUEUE",
  "RECURSION",
  "BACKTRACKING",
  "GREEDY",
  "DYNAMIC_PROGRAMMING",
  "TREES",
  "BINARY_TREE",
  "BINARY_SEARCH_TREE",
  "TRIE",
  "GRAPH",
  "UNION_FIND",
  "SHORTEST_PATH",
  "TOPOLOGICAL_SORT",
  "BIT_MANIPULATION",
  "INTERVALS",
  "MATRIX",
  "MATH",
  "GEOMETRY",
  "DESIGN",
  "SIMULATION",
];

const DIFFICULTIES = [
  "EASY",
  "MEDIUM",
  "HARD",
];

const STATUSES = [
  "NOT_STARTED",
  "IN_PROGRESS",
 
];

const formatEnum = (value) =>
  value
    .toLowerCase()
    .split("_")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() +
        w.slice(1)
    )
    .join(" ");

export const ProblemForm = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const {
    register,
    handleSubmit,watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      platform: "",
      topic: "ARRAYS",
      difficulty: "EASY",
      status: "NOT_STARTED",
      notes: "",
      solutionUrl: "",
      solvedDate: "",
      nextRevisionDate: "",
    },
  });const status = watch("status");

  const submit = async (data) => {
  setIsSubmitting(true);

  data.solvedDate = null;

  if (data.nextRevisionDate === "") {
    data.nextRevisionDate = null;
  }

  await onSubmit(data);

  setIsSubmitting(false);
};

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      {/* Title */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Problem Title
        </label>

        <input
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Platform */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Platform
        </label>

        <input
          {...register("platform")}
          placeholder="LeetCode"
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* Topic */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Topic
        </label>

        <select
          {...register("topic")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        >
          {TOPICS.map((topic) => (
            <option
              key={topic}
              value={topic}
            >
              {formatEnum(topic)}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Difficulty
        </label>

        <select
          {...register("difficulty")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        >
          {DIFFICULTIES.map((difficulty) => (
            <option
              key={difficulty}
              value={difficulty}
            >
              {formatEnum(difficulty)}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Status
        </label>

        <select
          {...register("status")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        >
          {STATUSES.map((status) => (
            <option
              key={status}
              value={status}
            >
              {formatEnum(status)}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Notes
        </label>

        <textarea
          rows={4}
          {...register("notes")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 resize-none"
        />
      </div>

      {/* Solution URL */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Solution URL
        </label>

        <input
          {...register("solutionUrl")}
          placeholder="https://..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />
      </div>

      {/* Dates */}
<div className="grid grid-cols-2 gap-4">

 

  <div>
    <label className="block text-sm font-semibold mb-2">
      Next Revision
    </label>

    <input
      type="date"
      {...register("nextRevisionDate")}
      className="w-full rounded-xl border border-slate-200 px-4 py-3"
    />
  </div>

</div>

      {/* Buttons */}

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
          className="px-5 py-2 rounded-xl saas-bg-primary"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Save Changes"
            : "Create Problem"}
        </button>

      </div>

    </form>
  );
};