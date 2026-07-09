import React from "react";

export const ResumeStatusBadge = ({ status }) => {
  const styles = {
    DRAFT: "bg-slate-100 text-slate-700",
    ACTIVE: "bg-green-100 text-green-700",
    ARCHIVED: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};