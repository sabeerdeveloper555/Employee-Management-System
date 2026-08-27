const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../server");
const Employee = require("../models/Employee");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await Employee.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Employee API", () => {
  test("GET / should return API running message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Employee Management API is running 🚀",
    });
  });

  test("POST /api/employees should create an employee successfully", async () => {
    const employeeData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 555 123 4567",
      department: "IT",
      position: "Software Engineer",
      salary: 120000,
      joiningDate: "2026-08-26",
      status: "Active",
    };

    const response = await request(app)
      .post("/api/employees")
      .send(employeeData);

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Employee created successfully");

    expect(response.body.data).toMatchObject({
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 555 123 4567",
      department: "IT",
      position: "Software Engineer",
      salary: 120000,
      status: "Active",
    });

    expect(response.body.data).toHaveProperty("_id");
  });

  test("POST /api/employees should return 400 when full name is missing", async () => {
    const employeeData = {
      email: "john.doe@example.com",
      phone: "+1 555 123 4567",
      department: "IT",
      position: "Software Engineer",
      salary: 120000,
      joiningDate: "2026-08-26",
      status: "Active",
    };

    const response = await request(app)
      .post("/api/employees")
      .send(employeeData);

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({
      success: false,
      message: "Full name is required",
    });
  });

  test("POST /api/employees should return 400 for invalid email", async () => {
    const response = await request(app).post("/api/employees").send({
      fullName: "John Doe",
      email: "invalid-email",
      phone: "+1 555 123 4567",
      department: "IT",
      position: "Software Engineer",
      salary: 120000,
      joiningDate: "2026-08-26",
      status: "Active",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({
      success: false,
      message: "Email must be a valid email address",
    });
  });

  test("POST /api/employees should return 400 when phone is missing", async () => {
    const response = await request(app).post("/api/employees").send({
      fullName: "John Doe",
      email: "john.phone@example.com",
      // phone intentionally missing
      department: "IT",
      position: "Software Engineer",
      salary: 120000,
      joiningDate: "2026-08-26",
      status: "Active",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({
      success: false,
      message: "Phone is required",
    });
  });
});
