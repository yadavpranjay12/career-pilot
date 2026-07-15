import React from "react";

export const ProblemFilters = ({
  filters,
  setFilters,
}) => {
  return (
    <div className="saas-card flex flex-wrap gap-4">

      <input
        type="text"
        placeholder="Search problem..."
        value={filters.keyword}
        onChange={(e) =>
          setFilters({
            ...filters,
            keyword: e.target.value,
          })
        }
        className="px-4 py-3 rounded-xl border border-slate-200"
      />

      <select
        value={filters.topic}
        onChange={(e) =>
          setFilters({
            ...filters,
            topic: e.target.value,
          })
        }
        className="px-4 py-3 rounded-xl border border-slate-200"
      >
        <option value="">All Topics</option>
        <option value="ARRAYS">Arrays</option>
        <option value="STRINGS">Strings</option>
        <option value="LINKED_LIST">Linked List</option>
        <option value="STACK">Stack</option>
        <option value="QUEUE">Queue</option>
        <option value="TREE">Tree</option>
        <option value="GRAPH">Graph</option>
        <option value="DYNAMIC_PROGRAMMING">Dynamic Programming</option>
      </select>

      <select
        value={filters.difficulty}
        onChange={(e) =>
          setFilters({
            ...filters,
            difficulty: e.target.value,
          })
        }
        className="px-4 py-3 rounded-xl border border-slate-200"
      >
        <option value="">Difficulty</option>
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status: e.target.value,
          })
        }
        className="px-4 py-3 rounded-xl border border-slate-200"
      >
        <option value="">Status</option>
        <option value="NOT_STARTED">Not Started</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

    </div>
  );
};