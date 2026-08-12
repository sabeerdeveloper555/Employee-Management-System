import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  HiOutlineBriefcase,
  HiOutlineCash,
  HiOutlineUserAdd,
  HiOutlineUsers,
  HiOutlineArrowRight,
  HiOutlinePlus,
} from "react-icons/hi";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import Header from "../components/layout/Header";

import useDashboardStore from "../store/dashboardStore";

const quickActions = [
  "Review onboarding tasks",
  "Approve leave requests",
  "Prepare monthly payroll",
];

function Dashboard() {
  const {
    dashboardData,
    loading,
    error,
    fetchDashboardData,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const stats = useMemo(() => {
    if (!dashboardData) {
      return [];
    }

    const activeRatio = dashboardData.totalEmployees
      ? Math.round(
          (dashboardData.activeEmployees /
            dashboardData.totalEmployees) *
            100
        )
      : 0;

    return [
      {
        title: "Total Employees",
        value: dashboardData.totalEmployees,
        change: `${dashboardData.totalEmployees} team members`,
        icon: HiOutlineUsers,
        accent: "bg-indigo-50 text-indigo-600",
      },
      {
        title: "Active Employees",
        value: dashboardData.activeEmployees,
        change: `${activeRatio}% active`,
        icon: HiOutlineBriefcase,
        accent: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Inactive Employees",
        value: dashboardData.inactiveEmployees,
        change: "Need follow-up",
        icon: HiOutlineUserAdd,
        accent: "bg-amber-50 text-amber-600",
      },
      {
        title: "Departments",
        value: dashboardData.totalDepartments,
        change: "Cross-functional",
        icon: HiOutlineCash,
        accent: "bg-slate-100 text-slate-700",
      },
    ];
  }, [dashboardData]);

  const recentEmployees = dashboardData?.recentEmployees || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Dashboard"
        subtitle="A calm, focused view of your workforce and key people operations."
        actions={
          <Button
            to="/employees/add"
            icon={HiOutlinePlus}
            variant="primary"
          >
            Add Employee
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={`skeleton-${index}`} hover>
                <div className="space-y-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                  <div className="h-8 w-20 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
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
                  <th className="px-5 py-3 font-medium sm:px-6">
                    Name
                  </th>

                  <th className="px-5 py-3 font-medium sm:px-6">
                    Department
                  </th>

                  <th className="px-5 py-3 font-medium sm:px-6">
                    Role
                  </th>

                  <th className="px-5 py-3 font-medium sm:px-6">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Loading Skeleton */}
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr
                      key={`employee-skeleton-${index}`}
                      className="border-t border-slate-200/80"
                    >
                      {/* Name Skeleton */}
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />

                          <div className="space-y-2">
                            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                            <div className="h-3 w-40 animate-pulse rounded bg-slate-200" />
                          </div>
                        </div>
                      </td>

                      {/* Department Skeleton */}
                      <td className="px-5 py-4 sm:px-6">
                        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                      </td>

                      {/* Role Skeleton */}
                      <td className="px-5 py-4 sm:px-6">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                      </td>

                      {/* Status Skeleton */}
                      <td className="px-5 py-4 sm:px-6">
                        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  /* Error State */
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-8 sm:px-6"
                    >
                      <div className="text-center">
                        <p className="text-sm font-medium text-rose-600">
                          {error}
                        </p>

                        <button
                          type="button"
                          onClick={fetchDashboardData}
                          className="mt-3 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                        >
                          Try again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : recentEmployees.length === 0 ? (
                  /* Empty State */
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-8 text-center text-sm text-slate-500 sm:px-6"
                    >
                      No recent employees found.
                    </td>
                  </tr>
                ) : (
                  /* Employee Data */
                  recentEmployees.map((employee) => (
                    <tr
                      key={employee._id || employee.email}
                      className="border-t border-slate-200/80"
                    >
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                            {employee.fullName
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {employee.fullName}
                            </p>

                            <p className="text-sm text-slate-500">
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Quick Actions
                </p>

                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  Stay ahead
                </h3>
              </div>
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
                  >
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Team Health */}
          <Card className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            <p className="text-sm font-medium text-indigo-100">
              Team health
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              82% engagement score
            </h3>

            <p className="mt-2 text-sm text-indigo-100">
              New hires are moving faster with the updated onboarding
              experience.
            </p>

            <Button
              to="/employees"
              variant="secondary"
              className="mt-5 bg-white text-indigo-700 hover:bg-indigo-50"
            >
              Explore people insights
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;