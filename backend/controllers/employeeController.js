const Employee = require("../models/Employee");
const asyncHandler = require("../middleware/asyncHandler");
const mongoose = require("mongoose");

exports.createEmployee = asyncHandler(async (req, res) => {
  const payload = req.body;

  if (!payload?.fullName?.trim()) {
    const error = new Error("Full name is required");
    error.statusCode = 400;
    throw error;
  }

  if (!payload?.email?.trim()) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    const error = new Error("Email must be a valid email address");
    error.statusCode = 400;
    throw error;
  }

  if (!payload?.phone?.trim()) {
    const error = new Error("Phone is required");
    error.statusCode = 400;
    throw error;
  }

  if (!payload?.department?.trim()) {
    const error = new Error("Department is required");
    error.statusCode = 400;
    throw error;
  }

  if (!payload?.position?.trim()) {
    const error = new Error("Position is required");
    error.statusCode = 400;
    throw error;
  }

  if (
    payload.salary === undefined ||
    payload.salary === null ||
    Number(payload.salary) <= 0
  ) {
    const error = new Error("Salary must be greater than zero");
    error.statusCode = 400;
    throw error;
  }

  if (!payload?.joiningDate) {
    const error = new Error("Joining date is required");
    error.statusCode = 400;
    throw error;
  }

  const employee = await Employee.create({
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    department: payload.department.trim(),
    position: payload.position.trim(),
    salary: Number(payload.salary),
    joiningDate: payload.joiningDate,
    status: payload.status?.trim() || "Active",
  });

  // Debug Logs
  console.log("Saved Employee:", employee);
  console.log("Connected Database:", mongoose.connection.name);
  console.log("Connected Collection:", Employee.collection.name);

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employee,
  });
});

exports.getEmployees = asyncHandler(async (req, res) => {
  const { search = "", department, status, sort } = req.query;
  const query = {};

  if (department) {
    query.department = department;
  }

  if (status) {
    query.status = status;
  }

  if (search && search.trim()) {
    const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = [
      { fullName: new RegExp(safeSearch, "i") },
      { email: new RegExp(safeSearch, "i") },
    ];
  }

  let sortOption = {};

  switch (sort) {
    case "name-asc":
      sortOption = { fullName: 1 };
      break;
    case "name-desc":
      sortOption = { fullName: -1 };
      break;
    case "salary-asc":
      sortOption = { salary: 1 };
      break;
    case "salary-desc":
      sortOption = { salary: -1 };
      break;
    case "joiningDate-desc":
      sortOption = { joiningDate: -1 };
      break;
    case "joiningDate-asc":
      sortOption = { joiningDate: 1 };
      break;
    default:
      sortOption = {};
  }

  const employees = await Employee.find(query).sort(sortOption);

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
});

exports.getDashboardData = asyncHandler(async (req, res) => {
  const { range = "7d" } = req.query;

  const now = new Date();

  let startDate;
  let trendFormat;

  // Normalize today's date to the start of the day
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  switch (range) {
    case "7d": {
      // Last 7 calendar days including today
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 6);

      trendFormat = "daily";
      break;
    }

    case "30d": {
      // Last 30 calendar days including today
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 29);

      trendFormat = "daily";
      break;
    }

    case "year": {
      // From January 1st of the current year
      startDate = new Date(today.getFullYear(), 0, 1);

      trendFormat = "monthly";
      break;
    }

    default: {
      const error = new Error(
        "Invalid date range. Use 7d, 30d, or year."
      );

      error.statusCode = 400;
      throw error;
    }
  }

  /*
   * Date filter
   *
   * Example:
   * 7d   → last 7 calendar days
   * 30d  → last 30 calendar days
   * year → January 1 → today
   */
  const dateMatch = {
    joiningDate: {
      $gte: startDate,
      $lte: now,
    },
  };

  /*
   * 1. Overall Statistics
   */
  const statsResult = await Employee.aggregate([
    {
      $match: dateMatch,
    },
    {
      $group: {
        _id: null,

        totalEmployees: {
          $sum: 1,
        },

        activeEmployees: {
          $sum: {
            $cond: [{ $eq: ["$status", "Active"] }, 1, 0],
          },
        },

        inactiveEmployees: {
          $sum: {
            $cond: [{ $eq: ["$status", "Inactive"] }, 1, 0],
          },
        },

        departments: {
          $addToSet: "$department",
        },
      },
    },
    {
      $project: {
        _id: 0,

        totalEmployees: 1,

        activeEmployees: 1,

        inactiveEmployees: 1,

        totalDepartments: {
          $size: "$departments",
        },
      },
    },
  ]);

  /*
   * 2. Employees by Department
   */
  const departmentStats = await Employee.aggregate([
    {
      $match: dateMatch,
    },
    {
      $group: {
        _id: "$department",

        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,

        department: "$_id",

        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);

  /*
   * 3. Employee Status
   */
  const statusStats = await Employee.aggregate([
    {
      $match: dateMatch,
    },
    {
      $group: {
        _id: "$status",

        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,

        status: "$_id",

        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);

  /*
   * 4. Joining Trend
   *
   * Last 7 Days  → Daily
   * Last 30 Days → Daily
   * This Year    → Monthly
   */
  let joiningTrend = [];

  if (trendFormat === "daily") {
    const dailyTrend = await Employee.aggregate([
      {
        $match: dateMatch,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$joiningDate",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,

          date: "$_id",

          count: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    /*
     * Create all dates in the selected range.
     * This makes sure days with zero employees
     * are also shown on the chart.
     */
    const trendMap = new Map(
      dailyTrend.map((item) => [item.date, item.count])
    );

    const currentDate = new Date(startDate);

    while (currentDate <= today) {
      const dateKey = currentDate.toISOString().split("T")[0];

      joiningTrend.push({
        date: dateKey,
        count: trendMap.get(dateKey) || 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
  } else {
    /*
     * This Year → Monthly trend
     */
    const monthlyTrend = await Employee.aggregate([
      {
        $match: dateMatch,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$joiningDate",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,

          month: "$_id",

          count: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    const trendMap = new Map(
      monthlyTrend.map((item) => [item.month, item.count])
    );

    /*
     * Create all months from January
     * until the current month.
     */
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    for (let month = 0; month <= currentMonth; month++) {
      const monthKey = `${currentYear}-${String(month + 1).padStart(
        2,
        "0"
      )}`;

      joiningTrend.push({
        month: monthKey,
        count: trendMap.get(monthKey) || 0,
      });
    }
  }

  /*
   * 5. Recent Employees
   */
  const recentEmployees = await Employee.find(dateMatch)
    .sort({
      joiningDate: -1,
      createdAt: -1,
    })
    .limit(5)
    .select(
      "fullName email department position status joiningDate"
    )
    .lean();

  /*
   * Final Dashboard Data
   */
  const dashboardData = {
    totalEmployees: statsResult[0]?.totalEmployees || 0,

    activeEmployees: statsResult[0]?.activeEmployees || 0,

    inactiveEmployees: statsResult[0]?.inactiveEmployees || 0,

    totalDepartments: statsResult[0]?.totalDepartments || 0,

    departmentStats: departmentStats || [],

    statusStats: statusStats || [],

    joiningTrend: joiningTrend || [],

    recentEmployees: recentEmployees || [],
  };

  /*
   * API Response
   */
  res.status(200).json({
    success: true,

    range,

    data: dashboardData,
  });
});

exports.getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
});

exports.updateEmployee = asyncHandler(async (req, res) => {
  if (
    req.body.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email.trim())
  ) {
    const error = new Error("Email must be a valid email address");
    error.statusCode = 400;
    throw error;
  }

  if (
    req.body.salary !== undefined &&
    req.body.salary !== null &&
    Number(req.body.salary) <= 0
  ) {
    const error = new Error("Salary must be greater than zero");
    error.statusCode = 400;
    throw error;
  }

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      fullName: req.body.fullName?.trim(),
      email: req.body.email?.trim().toLowerCase(),
      phone: req.body.phone?.trim(),
      department: req.body.department?.trim(),
      position: req.body.position?.trim(),
      salary:
        req.body.salary !== undefined ? Number(req.body.salary) : undefined,
      status: req.body.status?.trim() || "Active",
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: employee,
  });
});

exports.deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});
