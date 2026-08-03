const Employee = require("../models/Employee");
const asyncHandler = require("../middleware/asyncHandler");

exports.createEmployee = asyncHandler(async (req, res, next) => {
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

    if (payload.salary === undefined || payload.salary === null || Number(payload.salary) <= 0) {
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
        ...payload,
        fullName: payload.fullName.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
        department: payload.department.trim(),
        position: payload.position.trim(),
        salary: Number(payload.salary),
        joiningDate: payload.joiningDate,
        status: payload.status?.trim() || "Active",
    });

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
    const [stats, recentEmployees] = await Promise.all([
        Employee.aggregate([
            {
                $group: {
                    _id: null,
                    totalEmployees: { $sum: 1 },
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
                    totalDepartments: {
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
                    totalDepartments: { $size: "$totalDepartments" },
                },
            },
        ]),
        Employee.find()
            .sort({ joiningDate: -1, createdAt: -1 })
            .limit(5)
            .select("fullName email department position status joiningDate")
            .lean(),
    ]);

    const dashboardData = {
        totalEmployees: stats[0]?.totalEmployees || 0,
        activeEmployees: stats[0]?.activeEmployees || 0,
        inactiveEmployees: stats[0]?.inactiveEmployees || 0,
        totalDepartments: stats[0]?.totalDepartments || 0,
        recentEmployees: recentEmployees || [],
    };

    res.status(200).json({
        success: true,
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
    if (req.body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email.trim())) {
        const error = new Error("Email must be a valid email address");
        error.statusCode = 400;
        throw error;
    }

    if (req.body.salary !== undefined && req.body.salary !== null && Number(req.body.salary) <= 0) {
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
            salary: req.body.salary !== undefined ? Number(req.body.salary) : undefined,
            status: req.body.status?.trim() || "Active",
        },
        {
            new: true,
            runValidators: true,
        }
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