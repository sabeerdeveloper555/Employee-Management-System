const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getDashboardData,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post("/", createEmployee);

router.get("/dashboard", getDashboardData);

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;