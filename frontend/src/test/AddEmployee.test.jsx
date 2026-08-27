import { describe, expect, it, vi, beforeEach } from "vitest";

import { render, screen, fireEvent, act } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

import AddEmployee from "../pages/AddEmployee.jsx";

const { createEmployeeMock, toastErrorMock } = vi.hoisted(() => ({
  createEmployeeMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

vi.mock("../services/employeeService", () => ({
  createEmployee: createEmployeeMock,
}));

vi.mock("react-hot-toast", () => ({
  default: {
    error: toastErrorMock,
    success: vi.fn(),
  },
}));

describe("AddEmployee Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the employee form correctly", () => {
    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Add Employee",
      }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Alex Morgan")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("alex@peoplehub.com"),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("+1 555 0148")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Senior Product Designer"),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("120000")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Save Employee",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Discard",
      }),
    ).toBeInTheDocument();
  });

  it("shows validation error when submitting an empty form", () => {
    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>,
    );

    const form = screen
      .getByRole("button", {
        name: "Save Employee",
      })
      .closest("form");

    fireEvent.submit(form);

    expect(toastErrorMock).toHaveBeenCalledWith("Full Name is required.");

    expect(createEmployeeMock).not.toHaveBeenCalled();
  });

  it("submits valid employee data successfully", async () => {
    const user = userEvent.setup();

    createEmployeeMock.mockResolvedValue({
      data: {
        message: "Employee created successfully.",
      },
    });

    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>,
    );

    await user.type(screen.getByPlaceholderText("Alex Morgan"), "John Doe");

    await user.type(
      screen.getByPlaceholderText("alex@peoplehub.com"),
      "john@example.com",
    );

    await user.type(
      screen.getByPlaceholderText("+1 555 0148"),
      "+92 300 1234567",
    );

    const departmentSelect = document.querySelector(
      'select[name="department"]',
    );

    await user.selectOptions(departmentSelect, "IT");

    await user.type(
      screen.getByPlaceholderText("Senior Product Designer"),
      "Software Engineer",
    );

    await user.type(screen.getByPlaceholderText("120000"), "100000");

    const joiningDateInput = document.querySelector(
      'input[name="joiningDate"]',
    );

    await user.type(joiningDateInput, "2026-08-26");

    const statusSelect = document.querySelector('select[name="status"]');

    await user.selectOptions(statusSelect, "Active");

    await user.click(
      screen.getByRole("button", {
        name: "Save Employee",
      }),
    );

    expect(createEmployeeMock).toHaveBeenCalledWith({
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+92 300 1234567",
      department: "IT",
      position: "Software Engineer",
      salary: 100000,
      joiningDate: "2026-08-26",
      status: "Active",
    });
  });

  it("shows an error when employee creation fails", async () => {
    const user = userEvent.setup();

    createEmployeeMock.mockRejectedValue({
      response: {
        data: {
          message: "Email already exists.",
        },
      },
    });

    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>,
    );

    await user.type(screen.getByPlaceholderText("Alex Morgan"), "John Doe");

    await user.type(
      screen.getByPlaceholderText("alex@peoplehub.com"),
      "john@example.com",
    );

    await user.type(
      screen.getByPlaceholderText("+1 555 0148"),
      "+92 300 1234567",
    );

    const departmentSelect = document.querySelector(
      'select[name="department"]',
    );

    await user.selectOptions(departmentSelect, "IT");

    await user.type(
      screen.getByPlaceholderText("Senior Product Designer"),
      "Software Engineer",
    );

    await user.type(screen.getByPlaceholderText("120000"), "100000");

    const joiningDateInput = document.querySelector(
      'input[name="joiningDate"]',
    );

    await user.type(joiningDateInput, "2026-08-26");

    const statusSelect = document.querySelector('select[name="status"]');

    await user.selectOptions(statusSelect, "Active");

    await user.click(
      screen.getByRole("button", {
        name: "Save Employee",
      }),
    );

    expect(createEmployeeMock).toHaveBeenCalled();

    expect(toastErrorMock).toHaveBeenCalledWith("Email already exists.");
  });

  it("prevents duplicate submission while creating an employee", async () => {
    const user = userEvent.setup();

    let resolveCreateEmployee;

    createEmployeeMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreateEmployee = resolve;
        }),
    );

    render(
      <BrowserRouter>
        <AddEmployee />
      </BrowserRouter>,
    );

    await user.type(screen.getByPlaceholderText("Alex Morgan"), "John Doe");

    await user.type(
      screen.getByPlaceholderText("alex@peoplehub.com"),
      "john@example.com",
    );

    await user.type(
      screen.getByPlaceholderText("+1 555 0148"),
      "+92 300 1234567",
    );

    const departmentSelect = document.querySelector(
      'select[name="department"]',
    );

    await user.selectOptions(departmentSelect, "IT");

    await user.type(
      screen.getByPlaceholderText("Senior Product Designer"),
      "Software Engineer",
    );

    await user.type(screen.getByPlaceholderText("120000"), "100000");

    const joiningDateInput = document.querySelector(
      'input[name="joiningDate"]',
    );

    await user.type(joiningDateInput, "2026-08-26");

    const statusSelect = document.querySelector('select[name="status"]');

    await user.selectOptions(statusSelect, "Active");

    const saveButton = screen.getByRole("button", {
      name: "Save Employee",
    });

    await user.click(saveButton);

    expect(
      screen.getByRole("button", {
        name: "Creating...",
      }),
    ).toBeInTheDocument();

    expect(createEmployeeMock).toHaveBeenCalledTimes(1);

    await user.click(
      screen.getByRole("button", {
        name: "Creating...",
      }),
    );

    expect(createEmployeeMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveCreateEmployee({
        data: {
          message: "Employee created successfully.",
        },
      });
    });
  });
});
