import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../common/Card";

const STATUS_COLORS = {
  Active: "#10b981",
  Inactive: "#f59e0b",
};

function StatusChart({ data }) {
  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Employee Status
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Active and inactive employee distribution.
        </p>
      </div>

      <div className="h-[320px] w-full">
        {data?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={4}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status] || "#64748b"}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No status data available.
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatusChart;
