import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HiOutlinePhone,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMail,
} from "react-icons/hi";
import Header from "../components/layout/Header.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import Input from "../components/common/Input.jsx";
import { createEmployee } from "../services/employeeService";

const departments = ["IT", "HR", "Finance", "Marketing", "Sales"];
const statuses = ["Active", "Inactive"];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  department: "",
  position: "",
  salary: "",
  joiningDate: "",
  status: "Active",
};

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const trimmed = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      department: form.department.trim(),
      position: form.position.trim(),
      salary: form.salary.trim(),
      joiningDate: form.joiningDate.trim(),
      status: form.status.trim() || "Active",
    };

    if (!trimmed.fullName) {
      toast.error("Full Name is required.");
      return null;
    }

    if (!trimmed.email) {
      toast.error("Email is required.");
      return null;
    }

    if (!trimmed.phone) {
      toast.error("Phone is required.");
      return null;
    }

    if (!trimmed.department) {
      toast.error("Department is required.");
      return null;
    }

    if (!trimmed.position) {
      toast.error("Position is required.");
      return null;
    }

    if (!trimmed.salary || Number(trimmed.salary) <= 0) {
      toast.error("Salary must be greater than zero.");
      return null;
    }

    if (!trimmed.joiningDate) {
      toast.error("Joining Date is required.");
      return null;
    }

    return {
      ...trimmed,
      salary: Number(trimmed.salary),
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const payload = validateForm();

    if (!payload) {
      return;
    }

    try {
      setLoading(true);
      await createEmployee(payload);
      toast.success("Employee created successfully.");
      setForm(initialForm);
      navigate("/employees");
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to create employee.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="Add Employee"
        subtitle="Create a polished employee profile with the right details from the start."
        actions={
          <Button variant="outline" to="/employees">
            Cancel
          </Button>
        }
      />

      <Card className="border-slate-200/80">
        <form className="grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <h3 className="text-lg font-semibold text-slate-900">Profile details</h3>
              <p className="mt-1 text-sm text-slate-500">
                Use a clear, professional overview for every new hire.
              </p>
            </div>

            <Input
              label="Full Name"
              name="fullName"
              icon={HiOutlineUser}
              placeholder="Alex Morgan"
              required
              value={form.fullName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              icon={HiOutlineMail}
              type="email"
              placeholder="alex@peoplehub.com"
              required
              value={form.email}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              icon={HiOutlinePhone}
              type="tel"
              placeholder="+1 555 0148"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <h3 className="text-lg font-semibold text-slate-900">Role & employment</h3>
              <p className="mt-1 text-sm text-slate-500">
                Capture the role, compensation, and employment state.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Department <span className="text-rose-500">*</span>
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Position"
              name="position"
              placeholder="Senior Product Designer"
              required
              value={form.position}
              onChange={handleChange}
            />
            <Input
              label="Salary"
              name="salary"
              icon={HiOutlineCurrencyDollar}
              placeholder="120000"
              required
              value={form.salary}
              onChange={handleChange}
            />
            <Input
              label="Joining Date"
              name="joiningDate"
              icon={HiOutlineCalendar}
              type="date"
              required
              value={form.joiningDate}
              onChange={handleChange}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status <span className="text-rose-500">*</span>
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
            <Button variant="outline" to="/employees">
              Discard
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Employee"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
