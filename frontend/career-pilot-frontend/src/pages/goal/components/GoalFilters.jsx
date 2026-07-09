export const GoalFilters = ({ filters, setFilters }) => {
  return (
    <div className="saas-card p-6 flex flex-col md:flex-row gap-4">

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status: e.target.value,
          })
        }
        className="w-48 px-4 py-3 rounded-xl border border-slate-300 bg-white text-center font-medium"
      >
        <option value="">All Status</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>

      <select
        value={filters.type}
        onChange={(e) =>
          setFilters({
            ...filters,
            type: e.target.value,
          })
        }
       className="w-48 px-4 py-3 rounded-xl border border-slate-300 bg-white text-center font-medium"
      >
        <option value="">All Types</option>
        <option value="DSA">DSA</option>
        <option value="INTERNSHIP">INTERNSHIP</option>
        <option value="RESUME">RESUME</option>
        <option value="INTERVIEW">INTERVIEW</option>
      </select>

    </div>
  );
};