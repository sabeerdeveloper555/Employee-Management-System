import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function JoiningTrendChart({ data }) {
  const formattedData = (data || []).map((item) => {
    if (item.date) {
      const date = new Date(`${item.date}T00:00:00`);

      return {
        ...item,
        label: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
    }

    if (item.month) {
      const date = new Date(`${item.month}-01T00:00:00`);

      return {
        ...item,
        label: date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
      };
    }

    return item;
  });

  return (
    <div className="h-[320px] w-full">
      {formattedData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{
                fontSize: 12,
              }}
              interval="preserveStartEnd"
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              formatter={(value) => [value, "New Employees"]}
            />

            <Line
              type="monotone"
              dataKey="count"
              name="New Employees"
              stroke="#10b981"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          No joining trend data available.
        </div>
      )}
    </div>
  );
}

export default JoiningTrendChart;