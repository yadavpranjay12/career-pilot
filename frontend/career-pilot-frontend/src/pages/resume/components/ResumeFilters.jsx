export const ResumeFilters = ({
  filters,
  setFilters,
}) => {
  return (
    <div className="saas-card flex flex-wrap gap-4">

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status: e.target.value,
          })
        }
        className="px-4 py-3 rounded-xl border border-slate-200 bg-white"
      >
        <option value="">
          All Status
        </option>

        <option value="DRAFT">
          Draft
        </option>

        <option value="ACTIVE">
          Active
        </option>

        <option value="ARCHIVED">
          Archived
        </option>

      </select>

    </div>
  );
};