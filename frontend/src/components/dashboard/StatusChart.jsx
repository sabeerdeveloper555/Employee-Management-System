import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  Active: "#10b981",
  Inactive: "#f59e0b",
};

function StatusChart({ data = [] }) {
  return (
    <div className="h-[320px] w-full">
      {data.length > 0 ? (
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
              isAnimationActive={false}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={
                    STATUS_COLORS[entry.status] ||
                    "#64748b"
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          No status data available.
        </div>
      )}
    </div>
  );
}

export default StatusChart;