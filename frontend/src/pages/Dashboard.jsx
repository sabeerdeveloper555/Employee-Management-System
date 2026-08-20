import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBriefcase,
  HiOutlineUserAdd,
  HiOutlineUsers,
  HiOutlineArrowRight,
  HiOutlinePlus,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import Header from "../components/layout/Header";

import DashboardFilter from "../components/dashboard/DashboardFilter";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import JoiningTrendChart from "../components/dashboard/JoiningTrendChart";
import StatusChart from "../components/dashboard/StatusChart";

import useDashboardStore from "../store/dashboardStore";

const quickActions = [
  "Review onboarding tasks",
  "Approve leave requests",
  "Prepare monthly payroll",
];

function Dashboard() {
  const { dashboardData, loading, error, selectedRange, fetchDashboardData } =
    useDashboardStore();

  useEffect(() => {
    fetchDashboardData("7d");
  }, [fetchDashboardData]);

  const stats = useMemo(() => {
    if (!dashboardData) {
      return [];
    }

    const totalEmployees = dashboardData.totalEmployees || 0;
    const activeEmployees = dashboardData.activeEmployees || 0;
    const inactiveEmployees = dashboardData.inactiveEmployees || 0;
    const totalDepartments = dashboardData.totalDepartments || 0;

    const activeRatio = totalEmployees
      ? Math.round((activeEmployees / totalEmployees) * 100)
      : 0;

    return [
      {
        title: "Total Employees",
        value: totalEmployees,
        change: `${totalEmployees} team members`,
        icon: HiOutlineUsers,
        accent: "bg-indigo-50 text-indigo-600",
      },
      {
        title: "Active Employees",
        value: activeEmployees,
        change: `${activeRatio}% active`,
        icon: HiOutlineBriefcase,
        accent: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Inactive Employees",
        value: inactiveEmployees,
        change:
          inactiveEmployees > 0 ? "Need follow-up" : "All employees active",
        icon: HiOutlineUserAdd,
        accent: "bg-amber-50 text-amber-600",
      },
      {
        title: "Departments",
        value: totalDepartments,
        change: "Cross-functional",
        icon: HiOutlineOfficeBuilding,
        accent: "bg-slate-100 text-slate-700",
      },
    ];
  }, [dashboardData]);

  const recentEmployees = dashboardData?.recentEmployees || [];

  const departmentStats = dashboardData?.departmentStats || [];

  const statusStats = dashboardData?.statusStats || [];

  const joiningTrend = dashboardData?.joiningTrend || [];

  const activePercentage = dashboardData?.totalEmployees
    ? Math.round(
        (dashboardData.activeEmployees / dashboardData.totalEmployees) * 100,
      )
    : 0;

  const inactivePercentage = dashboardData?.totalEmployees
    ? Math.round(
        (dashboardData.inactiveEmployees / dashboardData.totalEmployees) * 100,
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Dashboard"
        subtitle="A real-time overview of your workforce and key employee insights."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <DashboardFilter
              value={selectedRange}
              onChange={fetchDashboardData}
            />

            <Button to="/employees/add" icon={HiOutlinePlus} variant="primary">
              Add Employee
            </Button>
          </div>
        }
      />

      {/* Error Message */}
      {error && (
        <Card>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-rose-600">
                Dashboard Error
              </p>

              <p className="mt-1 text-sm text-slate-500">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => fetchDashboardData(selectedRange)}
              className="w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Try Again
            </button>
          </div>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={`stat-skeleton-${index}`} hover>
                <div className="space-y-3">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

                  <div className="h-8 w-20 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                </div>
              </Card>
            ))
          : stats.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} hover>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {item.title}
                      </p>

                      <p className="mt-2 text-3xl font-semibold text-slate-900">
                        {item.value}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {item.change}
                      </p>
                    </div>

                    <div className={`rounded-2xl p-3 ${item.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              );
            })}
      </div>

      {/* Data Visualizations */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Workforce Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Visual insights based on your employee data.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <DepartmentChart data={departmentStats} />

          <JoiningTrendChart data={joiningTrend} />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <StatusChart data={statusStats} />

          {/* Workforce Summary */}
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Workforce Summary
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current employee status overview.
              </p>
            </div>

            <div className="space-y-6">
              {/* Active Employees */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Active Employees
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {dashboardData?.activeEmployees}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${activePercentage}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {activePercentage}% of total employees
                </p>
              </div>

              {/* Inactive Employees */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Inactive Employees
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {dashboardData?.inactiveEmployees}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                    style={{
                      width: `${inactivePercentage}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {inactivePercentage}% of total employees
                </p>
              </div>

              {/* Total Departments */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Departments
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {dashboardData?.totalDepartments}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-slate-600 shadow-sm">
                    <HiOutlineOfficeBuilding className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
        {/* Recent Employees */}
        <Card padded={false} className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Recent Employees
              </h3>

              <p className="text-sm text-slate-500">
                Latest team activity and status updates.
              </p>
            </div>

            <Button to="/employees" variant="ghost" size="sm">
              View all
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium sm:px-6">Name</th>

                  <th className="px-5 py-3 font-medium sm:px-6">Department</th>

                  <th className="px-5 py-3 font-medium sm:px-6">Role</th>

                  <th className="px-5 py-3 font-medium sm:px-6">Status</th>
                </tr>
              </thead>

              <tbody>
                {/* Loading */}
                {loading ? (
                  Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <tr
                      key={`employee-skeleton-${index}`}
                      className="border-t border-slate-200/80"
                    >
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />

                          <div className="space-y-2">
                            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                            <div className="h-3 w-40 animate-pulse rounded bg-slate-200" />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 sm:px-6">
                        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                      </td>

                      <td className="px-5 py-4 sm:px-6">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                      </td>

                      <td className="px-5 py-4 sm:px-6">
                        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
                      </td>
                    </tr>
                  ))
                ) : recentEmployees.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-10 text-center text-sm text-slate-500 sm:px-6"
                    >
                      No recent employees found.
                    </td>
                  </tr>
                ) : (
                  recentEmployees.map((employee) => {
                    const initials = employee.fullName
                      ?.split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={employee._id || employee.email}
                        className="border-t border-slate-200/80 transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                              {initials || "NA"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-800">
                                {employee.fullName}
                              </p>

                              <p className="truncate text-sm text-slate-500">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-slate-600 sm:px-6">
                          {employee.department}
                        </td>

                        <td className="px-5 py-4 text-slate-600 sm:px-6">
                          {employee.position}
                        </td>

                        <td className="px-5 py-4 sm:px-6">
                          <Badge
                            variant={
                              employee.status === "Active"
                                ? "success"
                                : "warning"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Quick Actions
              </p>

              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                Stay ahead
              </h3>
            </div>

            <div className="mt-5 space-y-3">
              {quickActions.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>

                  <Link
                    to="/employees"
                    className="text-indigo-600 transition hover:text-indigo-700"
                    aria-label={`Go to employees for ${item}`}
                  >
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Data Insights */}
          <Card>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Data Insights
              </p>

              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                Workforce snapshot
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Active Rate
                </p>

                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {activePercentage}%
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Departments
                </p>

                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {dashboardData?.totalDepartments || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Selected Range
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {selectedRange === "7d"
                    ? "Last 7 Days"
                    : selectedRange === "30d"
                      ? "Last 30 Days"
                      : "This Year"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
