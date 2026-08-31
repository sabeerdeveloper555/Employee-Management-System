import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import DashboardFilter from "../components/dashboard/DashboardFilter";
import { getDashboardData } from "../services/employeeService";

const DepartmentChart = lazy(
  () => import("../components/dashboard/DepartmentChart")
);

const JoiningTrendChart = lazy(
  () => import("../components/dashboard/JoiningTrendChart")
);

const StatusChart = lazy(
  () => import("../components/dashboard/StatusChart")
);

const ChartLoader = memo(function ChartLoader() {
  return (
    <div className="flex h-[320px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
        <span className="text-sm text-slate-500">
          Loading chart...
        </span>
      </div>
    </div>
  );
});

const StatCard = memo(function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
      </div>
    </Card>
  );
});

function Dashboard() {
  const [range, setRange] = useState("7d");
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardData(range);

      const data = response?.data ?? response;

      setDashboard(data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load dashboard data.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const stats = useMemo(() => {
    if (!dashboard) {
      return {
        totalEmployees: 0,
        activeEmployees: 0,
        inactiveEmployees: 0,
        newEmployees: 0,
      };
    }

    return {
      totalEmployees:
        dashboard.totalEmployees ??
        dashboard.total ??
        dashboard.stats?.totalEmployees ??
        0,

      activeEmployees:
        dashboard.activeEmployees ??
        dashboard.active ??
        dashboard.stats?.activeEmployees ??
        0,

      inactiveEmployees:
        dashboard.inactiveEmployees ??
        dashboard.inactive ??
        dashboard.stats?.inactiveEmployees ??
        0,

      newEmployees:
        dashboard.newEmployees ??
        dashboard.newHires ??
        dashboard.stats?.newEmployees ??
        0,
    };
  }, [dashboard]);

  const chartData = useMemo(() => {
    if (!dashboard) {
      return {
        departmentData: [],
        joiningTrendData: [],
        statusData: [],
      };
    }

    return {
      departmentData:
        dashboard.departmentStats ??
        dashboard.departmentData ??
        dashboard.employeesByDepartment ??
        dashboard.departments ??
        [],

      joiningTrendData:
        dashboard.joiningTrend ??
        dashboard.joiningTrendData ??
        dashboard.joiningData ??
        [],

      statusData:
        dashboard.statusStats ??
        dashboard.statusData ??
        dashboard.employeesByStatus ??
        dashboard.status ??
        [],
    };
  }, [dashboard]);

  const handleRangeChange = useCallback((value) => {
    setRange(value);
  }, []);

  if (loading && !dashboard) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-slate-200" />

            <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <div className="animate-pulse">
                  <div className="h-4 w-24 rounded bg-slate-200" />

                  <div className="mt-3 h-8 w-16 rounded bg-slate-200" />

                  <div className="mt-2 h-3 w-28 rounded bg-slate-200" />
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <div className="animate-pulse">
                  <div className="h-5 w-40 rounded bg-slate-200" />

                  <div className="mt-5 h-[280px] rounded-lg bg-slate-100" />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <Card>
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <UserX className="h-6 w-6 text-red-600" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                Unable to load dashboard
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchDashboard}
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Try Again
              </button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const activePercentage =
    stats.totalEmployees > 0
      ? Math.min(
          100,
          Math.round(
            (stats.activeEmployees / stats.totalEmployees) * 100
          )
        )
      : 0;

  const inactivePercentage =
    stats.totalEmployees > 0
      ? Math.min(
          100,
          Math.round(
            (stats.inactiveEmployees / stats.totalEmployees) * 100
          )
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              A real-time overview of your workforce and key employee
              insights.
            </p>
          </div>

          <DashboardFilter
            value={range}
            onChange={handleRangeChange}
          />
        </div>

        {loading && dashboard && (
          <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
            Updating dashboard...
          </div>
        )}

        {error && dashboard && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section
          aria-label="Employee statistics"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
            description="All employees"
          />

          <StatCard
            title="Active Employees"
            value={stats.activeEmployees}
            icon={UserCheck}
            description="Currently active"
          />

          <StatCard
            title="Inactive Employees"
            value={stats.inactiveEmployees}
            icon={UserX}
            description="Currently inactive"
          />

          <StatCard
            title="New Employees"
            value={stats.newEmployees}
            icon={UserPlus}
            description="During selected period"
          />
        </section>

        <section
          aria-label="Employee analytics"
          className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <Card>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Employees by Department
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Distribution of employees across departments.
              </p>
            </div>

            <Suspense fallback={<ChartLoader />}>
              <DepartmentChart
                data={chartData.departmentData}
              />
            </Suspense>
          </Card>

          <Card>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Joining Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Employee joining activity over time.
              </p>
            </div>

            <Suspense fallback={<ChartLoader />}>
              <JoiningTrendChart
                data={chartData.joiningTrendData}
              />
            </Suspense>
          </Card>

          <Card>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Employee Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current active and inactive employee distribution.
              </p>
            </div>

            <Suspense fallback={<ChartLoader />}>
              <StatusChart data={chartData.statusData} />
            </Suspense>
          </Card>

          <Card>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Workforce Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Quick overview of workforce activity.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Active Employees
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {activePercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${activePercentage}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Inactive Employees
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {inactivePercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{
                      width: `${inactivePercentage}%`,
                    }}
                  />
                </div>
              </div>

              <Link
                to="/employees"
                className="group flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span>View all employees</span>

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default memo(Dashboard);