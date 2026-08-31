import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Card from "../common/Card";

function DepartmentChart({ data }) {
  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Employees by Department
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Employee distribution across departments.
        </p>
      </div>

      <div className="h-[320px] w-full">
        {data?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="department" tick={{ fontSize: 12 }} />

              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

              <Tooltip />

              <Bar
                dataKey="count"
                name="Employees"
                radius={[6, 6, 0, 0]}
                fill="#4f46e5"
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No department data available.
          </div>
        )}
      </div>
    </Card>
  );
}

export default DepartmentChart;
