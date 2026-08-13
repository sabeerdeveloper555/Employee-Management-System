import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineX,
  HiOutlineFilter,
  HiOutlineSortAscending,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import Loader from "../components/common/Loader";

import useEmployeeStore from "../store/employeeStore";
import { deleteEmployee } from "../services/employeeService";

const departments = [
  "IT",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
];

const statuses = ["Active", "Inactive"];

const sortOptions = [
  {
    value: "name-asc",
    label: "Name: A → Z",
  },
  {
    value: "name-desc",
    label: "Name: Z → A",
  },
  {
    value: "salary-asc",
    label: "Salary: Low → High",
  },
  {
    value: "salary-desc",
    label: "Salary: High → Low",
  },
  {
    value: "date-asc",
    label: "Joining Date: Oldest → Newest",
  },
  {
    value: "date-desc",
    label: "Joining Date: Newest → Oldest",
  },
];

const ITEMS_PER_PAGE = 10;

function Employees() {
  const {
    employees,
    loading,
    error,
    fetchEmployees,
  } = useEmployeeStore();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const requestRef = useRef(0);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredAndSortedEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = employees.filter((employee) => {
      const name = employee.fullName?.toLowerCase() || "";
      const email = employee.email?.toLowerCase() || "";
      const position = employee.position?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        name.includes(query) ||
        email.includes(query) ||
        position.includes(query);

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      const matchesStatus =
        status === "All" ||
        employee.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });

    const sorted = [...filtered];

    sorted.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return (a.fullName || "").localeCompare(
            b.fullName || ""
          );

        case "name-desc":
          return (b.fullName || "").localeCompare(
            a.fullName || ""
          );

        case "salary-asc":
          return (
            Number(a.salary || 0) -
            Number(b.salary || 0)
          );

        case "salary-desc":
          return (
            Number(b.salary || 0) -
            Number(a.salary || 0)
          );

        case "date-asc":
          return (
            new Date(a.joiningDate || 0) -
            new Date(b.joiningDate || 0)
          );

        case "date-desc":
          return (
            new Date(b.joiningDate || 0) -
            new Date(a.joiningDate || 0)
          );

        default:
          return 0;
      }
    });

    return sorted;
  }, [
    employees,
    search,
    department,
    status,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredAndSortedEmployees.length / ITEMS_PER_PAGE
  );

  const paginatedEmployees = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex =
      startIndex + ITEMS_PER_PAGE;

    return filteredAndSortedEmployees.slice(
      startIndex,
      endIndex
    );
  }, [
    filteredAndSortedEmployees,
    currentPage,
  ]);

  const hasActiveFilters =
    search.trim() !== "" ||
    department !== "All" ||
    status !== "All";

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    resetToFirstPage();
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    resetToFirstPage();
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    resetToFirstPage();
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    resetToFirstPage();
  };

  const clearFilters = () => {
    setSearch("");
    setDepartment("All");
    setStatus("All");
    setCurrentPage(1);
  };

  const clearAll = () => {
    setSearch("");
    setDepartment("All");
    setStatus("All");
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);
  };

  const handleRefresh = async () => {
    const requestId = ++requestRef.current;

    try {
      await fetchEmployees();

      if (requestId === requestRef.current) {
        setCurrentPage(1);
      }
    } catch (error) {
      if (requestId === requestRef.current) {
        toast.error("Unable to refresh employees.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (deletingId) {
      return;
    }

    const employee = employees.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        employee?.fullName || "this employee"
      }?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteEmployee(id);

      toast.success("Employee deleted successfully.");

      await fetchEmployees();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Unable to delete employee.";

      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  /*
    If deleting the last employee on the current page
    makes that page unavailable, move to the previous page.
  */
  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const startItem =
    filteredAndSortedEmployees.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredAndSortedEmployees.length
  );

  return (
    <div className="space-y-6">
      <Header
        title="Employees"
        subtitle="Manage your workforce, employee details, and employment status."
        actions={
          <Button
            to="/employees/add"
            variant="primary"
            icon={HiOutlinePlus}
          >
            Add Employee
          </Button>
        }
      />

      <Card>
        <div className="space-y-4">
          {/* Search */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name, email or position..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <HiOutlineX className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              icon={HiOutlineRefresh}
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {/* Filters + Sorting */}
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:flex-wrap sm:items-end">
            {/* Department */}
            <div className="w-full sm:w-auto">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Department
              </label>

              <select
                value={department}
                onChange={handleDepartmentChange}
                className="w-full min-w-[180px] rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All">
                  All Departments
                </option>

                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="w-full sm:w-auto">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={status}
                onChange={handleStatusChange}
                className="w-full min-w-[160px] rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All">
                  All Statuses
                </option>

                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="w-full sm:w-auto">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Sort By
              </label>

              <div className="relative">
                <HiOutlineSortAscending className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full min-w-[220px] appearance-none rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-[42px] items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
              >
                <HiOutlineX className="h-4 w-4" />
                Clear Filters
              </button>
            )}

            {/* Reset */}
            {(hasActiveFilters ||
              sortBy !== "name-asc") && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex h-[42px] items-center justify-center rounded-2xl px-4 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Reset
              </button>
            )}
          </div>

          {/* Result Summary */}
          {!loading && !error && (
            <div className="flex flex-col gap-1 border-t border-slate-200 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {startItem}-{endItem}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {filteredAndSortedEmployees.length}
                </span>{" "}
                employees
              </p>

              <div className="flex items-center gap-2">
                <HiOutlineFilter className="h-4 w-4" />

                <span>
                  Sorted by{" "}
                  <span className="font-medium text-slate-700">
                    {
                      sortOptions.find(
                        (option) =>
                          option.value === sortBy
                      )?.label
                    }
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Employee Table */}
      <Card
        padded={false}
        className="overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium sm:px-6">
                  Employee
                </th>

                <th className="px-5 py-3 font-medium sm:px-6">
                  Department
                </th>

                <th className="px-5 py-3 font-medium sm:px-6">
                  Position
                </th>

                <th className="px-5 py-3 font-medium sm:px-6">
                  Salary
                </th>

                <th className="px-5 py-3 font-medium sm:px-6">
                  Joining Date
                </th>

                <th className="px-5 py-3 font-medium sm:px-6">
                  Status
                </th>

                <th className="px-5 py-3 text-right font-medium sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-10 sm:px-6"
                  >
                    <Loader label="Loading employees..." />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-10 text-center sm:px-6"
                  >
                    <div className="space-y-4">
                      <p className="text-sm text-rose-600">
                        {error}
                      </p>

                      <Button
                        type="button"
                        variant="outline"
                        icon={HiOutlineRefresh}
                        onClick={handleRefresh}
                      >
                        Try Again
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : paginatedEmployees.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center sm:px-6"
                  >
                    <div className="mx-auto max-w-md">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <HiOutlineSearch className="h-6 w-6 text-slate-400" />
                      </div>

                      <h3 className="mt-4 text-base font-semibold text-slate-900">
                        No employees found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {hasActiveFilters
                          ? "No employees match your current search and filters."
                          : "There are no employees available yet."}
                      </p>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearAll}
                          className="mt-4 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="border-t border-slate-200/80 transition hover:bg-slate-50/70"
                  >
                    {/* Employee */}
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                          {employee.fullName
                            ?.split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
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

                    {/* Department */}
                    <td className="px-5 py-4 text-slate-600 sm:px-6">
                      {employee.department}
                    </td>

                    {/* Position */}
                    <td className="px-5 py-4 text-slate-600 sm:px-6">
                      {employee.position}
                    </td>

                    {/* Salary */}
                    <td className="px-5 py-4 text-slate-600 sm:px-6">
                      {Number(
                        employee.salary || 0
                      ).toLocaleString()}
                    </td>

                    {/* Joining Date */}
                    <td className="px-5 py-4 text-slate-600 sm:px-6">
                      {employee.joiningDate
                        ? new Date(
                            employee.joiningDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Status */}
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

                    {/* Actions */}
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/employees/edit/${employee._id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                          aria-label={`Edit ${employee.fullName}`}
                          title="Edit employee"
                        >
                          <HiOutlinePencil className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(employee._id)
                          }
                          disabled={
                            deletingId === employee._id
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Delete ${employee.fullName}`}
                          title="Delete employee"
                        >
                          {deletingId ===
                          employee._id ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-rose-500" />
                          ) : (
                            <HiOutlineTrash className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading &&
          !error &&
          filteredAndSortedEmployees.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
              {/* Page Info */}
              <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-700">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {totalPages}
                </span>
              </p>

              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-1">
                {/* Previous */}
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <HiOutlineChevronLeft className="h-4 w-4" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        handlePageChange(page)
                      }
                      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <HiOutlineChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
      </Card>
    </div>
  );
}

export default Employees;