import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { EmptyState } from "../../../components/ui/States";

const COLORS = {
  ACTIVE: "#3b82f6",
  COMPLETED: "#22c55e",
};

export const GoalProgressChart = ({
  activeGoals,
  completedGoals,
}) => {
  const data = useMemo(() => {
    return [
      {
        name: "ACTIVE",
        value: activeGoals,
      },
      {
        name: "COMPLETED",
        value: completedGoals,
      },
    ].filter((item) => item.value > 0);
  }, [activeGoals, completedGoals]);

  if (data.length === 0) {
    return (
      <EmptyState message="No goals to visualize." />
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[entry.name]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />

        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          formatter={(value) =>
            value.charAt(0) +
            value.slice(1).toLowerCase()
          }
          wrapperStyle={{
            paddingTop: "20px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};