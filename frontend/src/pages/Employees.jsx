import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/common/Modal.jsx";
import { deleteEmployee, getEmployees } from "../services/employeeService";
import { Link } from "react-router-dom";

import {
  HiOutlineSearch,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

import { HiOutlineUserPlus } from "react-icons/hi2";

import Header from "../components/layout/Header.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import Badge from "../components/common/Badge.jsx";
import Input from "../components/common/Input.jsx";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const requestRef = useRef(0);

  const fetchEmployees = async (params = {}) => {
    const requestId = ++requestRef.current;

    try {
      setLoading(true);
      setError("");

      const response = await getEmployees(params);

      const employeeList = Array.isArray(response?.data)
        ? response.data
        : [];

      if (requestId === requestRef.current) {
        setEmployees(employeeList);
        setError("");
      }
    } catch {
      if (requestId === requestRef.current) {
        setError("Unable to load employees right now.");
      }
    } finally {
      if (requestId === requestRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchEmployees({
        search,
        department,
        status,
        sort,
      });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [search, department, status, sort]);

  const openDeleteModal = (employee) => {
    setDeleteTarget(employee);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setDeleteTarget(null);
  };

  const handleDeleteEmployee = async () => {
    if (!deleteTarget?._id || deleting) {
      return;
    }

    try {
      setDeleting(true);

      await deleteEmployee(deleteTarget._id);

      toast.success("Employee deleted successfully.");

      setDeleteTarget(null);

      await fetchEmployees({
        search,
        department,
        status,
        sort,
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to delete employee.";

      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };

  const formatSalary = (value) => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    const amount = Number(value);

    if (Number.isNaN(amount)) {
      return value;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatJoiningDate = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Employees"
        subtitle="Manage your team members, roles, and current engagement status."
        actions={
          <Button
            to="/employees/add"
            icon={HiOutlineUserPlus}
            variant="primary"
          >
            Add Employee
          </Button>
        }
      />

      {/* Employee Card */}
      <Card padded={false} className="overflow-hidden">
        {/* Filters */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            {/* Search */}
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search employees
              </label>

              <Input
                icon={HiOutlineSearch}
                placeholder="Search by name or email"
                className="max-w-xl"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                disabled={loading}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Department */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Department
                </label>

                <select
                  value={department}
                  onChange={(event) =>
                    setDepartment(event.target.value)
                  }
                  disabled={loading}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                  disabled={loading}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Sort
                </label>

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                  disabled={loading}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Default</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="salary-asc">
                    Salary Low to High
                  </option>
                  <option value="salary-desc">
                    Salary High to Low
                  </option>
                  <option value="joiningDate-desc">
                    Joining Date Newest
                  </option>
                  <option value="joiningDate-asc">
                    Joining Date Oldest
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-300px w-full text-left text-sm">
            <thead className="bg-white text-slate-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-semibold">
                  Employee
                </th>

                <th className="whitespace-nowrap px-4 py-3 font-semibold">
                  Phone
                </th>

                <th className="whitespace-nowrap px-4 py-3 font-semibold">
                  Department
                </th>

                <th className="whitespace-nowrap px-4 py-3 font-semibold">
                  Position
                </th>

                <th className="whitespace-nowrap px-4 py-3 font-semibold">
                  Salary
                </th>

                <th className="whitespace-nowrap px-4 py-3 font-semibold">
                  Joining Date
                </th>

                <th className="whitespace-nowrap px-4 py-3 font-semibold">
                  Status
                </th>

                <th className="whitespace-nowrap px-4 py-3 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Loading Skeleton */}
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <tr
                    key={`employee-skeleton-${index}`}
                    className="border-t border-slate-200/80"
                  >
                    {/* Employee */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />

                        <div className="space-y-2">
                          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                          <div className="h-3 w-40 animate-pulse rounded bg-slate-200" />
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    </td>

                    {/* Department */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                    </td>

                    {/* Position */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    </td>

                    {/* Salary */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                    </td>

                    {/* Joining Date */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200" />

                        <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : error && employees.length === 0 ? (
                /* Error State */
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-8 sm:px-6"
                  >
                    <div className="text-center">
                      <p className="text-sm font-medium text-rose-600">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          fetchEmployees({
                            search,
                            department,
                            status,
                            sort,
                          })
                        }
                        className="mt-3 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                      >
                        Try again
                      </button>
                    </div>
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                /* Empty State */
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-8 text-center text-sm text-slate-500 sm:px-6"
                  >
                    No employees found.
                  </td>
                </tr>
              ) : (
                /* Employee Data */
                employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="border-t border-slate-200/80"
                  >
                    {/* Employee */}
                    <td className="px-4 py-4 sm:px-6">
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

                          <p className="max-w-[220px] truncate text-sm text-slate-500">
                            {employee.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                      {employee.phone}
                    </td>

                    {/* Department */}
                    <td className="whitespace-nowrap px-4 py-4">
                      {employee.department}
                    </td>

                    {/* Position */}
                    <td className="px-4 py-4">
                      <div className="min-w-[180px]">
                        {employee.position}
                      </div>
                    </td>

                    {/* Salary */}
                    <td className="px-4 py-4 text-slate-600 sm:px-6">
                      {formatSalary(employee.salary)}
                    </td>

                    {/* Joining Date */}
                    <td className="whitespace-nowrap px-4 py-4 text-slate-600 sm:px-6">
                      {formatJoiningDate(employee.joiningDate)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 sm:px-6">
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

                    {/* Actions */}
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/employees/edit/${employee._id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                        >
                          <HiOutlinePencil className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(employee)
                          }
                          disabled={deleting}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-rose-200 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <HiOutlineTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={closeDeleteModal}
        title="Delete employee"
        actions={
          <>
            <Button
              variant="outline"
              onClick={closeDeleteModal}
              disabled={deleting}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={handleDeleteEmployee}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">
              {deleteTarget?.fullName || "this employee"}
            </span>
            ?
          </p>

          <p className="text-sm text-slate-500">
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
}