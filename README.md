# Employee Management System

A modern, responsive, full-stack **Employee Management System** built with the **MERN stack**.

The application helps organizations manage employee records through a clean and intuitive interface. It provides complete CRUD functionality, employee search and filtering, sorting, pagination, dashboard statistics, data visualization, form validation, error handling, and automated testing.

This project was developed as part of my **Full Stack Developer internship at NeuroFive Solutions**.

---

## Features

### Employee Management

- Add new employees
- Edit employee details
- Delete employees with confirmation
- Search employees by name or email
- Filter employees by department
- Filter employees by employee status
- Sort employees by:
  - Name
  - Salary
  - Joining date
- Pagination
- Combined search, filtering, sorting, and pagination
- Frontend form validation
- Backend validation
- Toast notifications
- Loading states
- Error handling
- Automatic pagination adjustment after employee deletion
- Prevention of duplicate form submission

---

## Dashboard & Data Visualization

The dashboard provides a visual overview of the employee database.

- Total employees statistics
- Active employees statistics
- Inactive employees statistics
- Total departments statistics
- Employees by department bar chart
- Employee joining trend line chart
- Active vs inactive employee donut chart
- Recent employees section
- Workforce summary
- Data insights
- Responsive charts
- Loading skeletons
- Error states
- Empty states

---

## Backend Data Aggregation

Dashboard information is processed on the backend using MongoDB queries and aggregation.

The backend can calculate:

- Total employees
- Active employees
- Inactive employees
- Total departments
- Department-wise employee distribution
- Employee status distribution
- Employee joining trends
- Recent employees

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- Zustand
- Recharts
- React Icons
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

## Testing

- Vitest
- React Testing Library
- Jest
- Supertest
- Playwright

---

# Project Structure

```text
Employee-Management-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   │   └── employeeController.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employeeRoutes.js
│   ├── test/
│   │   └── employee.test.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   └── layout/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── AddEmployee.jsx
│   │   │   ├── EditEmployee.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── axios.js
│   │   │   └── employeeService.js
│   │   ├── store/
│   │   │   └── dashboardStore.js
│   │   ├── test/
│   │   │   ├── setup.js
│   │   │   ├── AddEmployee.test.jsx
│   │   │   └── example.test.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── tests/
│   │   └── employee-flow.spec.js
│   ├── vitest.config.js
│   ├── playwright.config.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

# Application Architecture

```text
                         ┌──────────────────────┐
                         │        User          │
                         │     Web Browser      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      React.js        │
                         │  Pages & Components  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Zustand Store     │
                         │    Global State      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Axios          │
                         │    HTTP Requests     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Express.js API    │
                         │   RESTful Endpoints  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Employee Controller  │
                         │ Validation & Logic   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Mongoose Employee    │
                         │        Model         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       MongoDB        │
                         │   Employee Database  │
                         └──────────────────────┘
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/sabeerdeveloper555/Employee-Management-System.git
cd Employee-Management-System
```

---

# Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-management-system
```

Start the backend development server:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/employees/dashboard` | Get dashboard statistics |

---

# Validation & Error Handling

The application includes validation and error handling at both frontend and backend levels.

### Employee Validation

- Full name is required
- Email is required
- Email format validation
- Phone number is required
- Department is required
- Position is required
- Salary must be greater than zero
- Joining date is required
- Employee status supports `Active` and `Inactive`

### UI States

- Loading states
- Loading skeletons
- Error messages
- Empty states
- Retry actions
- Success toast notifications
- Error toast notifications
- Duplicate submission prevention

---

# Testing

The project uses automated tests across the frontend, backend, and end-to-end application flow.

```text
                    Automated Testing
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      Frontend          Backend             E2E
       Tests             Tests             Tests
          │                │                │
          ▼                ▼                ▼
     Vitest +           Jest +          Playwright
     RTL               Supertest
          │                │                │
          ▼                ▼                ▼
     Components        REST APIs       Real User Flow
     Interactions      Validation      Browser Testing
```

---

## Frontend Tests

Frontend tests use **Vitest** and **React Testing Library**.

Current tests include:

- Employee form rendering
- Successful employee creation
- Employee creation failure handling
- Duplicate submission prevention
- Basic JavaScript functionality

Frontend test files:

```text
frontend/src/test/AddEmployee.test.jsx
frontend/src/test/example.test.jsx
```

Run frontend tests:

```bash
cd frontend
npx vitest run
```

Current result:

```text
Test Files  2 passed
Tests       6 passed
```

---

## Backend Tests

Backend API tests use **Jest** and **Supertest**.

The current backend test suite covers:

- API health check
- Successful employee creation
- Missing full name validation
- Invalid email validation
- Missing phone validation

Backend test file:

```text
backend/test/employee.test.js
```

Run backend tests:

```bash
cd backend
npm test
```

Current result:

```text
Test Suites: 1 passed
Tests:       5 passed
```

---

# End-to-End Testing

The project uses **Playwright** for browser-based end-to-end testing.

The current E2E test simulates a real employee creation flow:

```text
Open Application
       ↓
Open Add Employee
       ↓
Verify Add Employee Page
       ↓
Fill Employee Information
       ↓
Select Department
       ↓
Select Status
       ↓
Submit Employee Form
       ↓
Employee Created
       ↓
Navigate to Employees
```

Playwright configuration:

```text
frontend/playwright.config.js
```

E2E test:

```text
frontend/tests/employee-flow.spec.js
```

Run the E2E test:

```bash
cd frontend
npx playwright test tests/employee-flow.spec.js
```

Current result:

```text
1 passed
```

To view the Playwright HTML report:

```bash
npx playwright show-report
```

---

# Running All Tests

### 1. Frontend Tests

```bash
cd frontend
npx vitest run
```

### 2. Backend Tests

```bash
cd backend
npm test
```

### 3. End-to-End Test

```bash
cd frontend
npx playwright test tests/employee-flow.spec.js
```

> The Playwright E2E test automatically starts the Vite development server through `playwright.config.js` when required.

---

# Dashboard Architecture

The dashboard follows a full-stack data flow:

```text
┌──────────────────────────┐
│      React Dashboard     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      Zustand Store       │
│    Dashboard State       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       Axios API          │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│     Express REST API     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ MongoDB + Mongoose       │
│ Aggregation / Queries    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Dashboard Statistics     │
│ Charts + Recent Data     │
└──────────────────────────┘
```

---

# Dashboard Visualizations

## Department Distribution

A bar chart displays the number of employees across:

- IT
- HR
- Finance
- Marketing
- Sales

## Joining Trend

A line chart visualizes employee joining activity over time using employee `joiningDate` data.

## Employee Status

A donut chart provides a comparison between:

- Active employees
- Inactive employees

## Recent Employees

The dashboard displays recent employee records with:

- Name
- Email
- Department
- Position
- Status

---

# Testing Checklist

## Employee Management

- [x] Create employee
- [x] Read employees
- [x] Update employee
- [x] Delete employee
- [x] Search employees
- [x] Filter employees
- [x] Sort employees
- [x] Pagination
- [x] Combined filters
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Toast notifications

## Dashboard

- [x] Dashboard statistics
- [x] Department bar chart
- [x] Joining trend line chart
- [x] Employee status donut chart
- [x] Backend data integration
- [x] MongoDB aggregation
- [x] Recent employees
- [x] Workforce summary
- [x] Data insights
- [x] Responsive dashboard
- [x] Real employee data testing

## Automated Testing

- [x] Frontend Vitest tests
- [x] React Testing Library tests
- [x] Backend Jest tests
- [x] Supertest API tests
- [x] Playwright E2E test
- [x] Test documentation
- [ ] Full test-suite demo video

---

# Learning Outcomes

This project provided practical experience in:

- Building RESTful APIs
- MongoDB data modeling
- MongoDB aggregation pipelines
- React component architecture
- CRUD operations
- Zustand state management
- Axios API integration
- Recharts data visualization
- Responsive dashboard development
- Form validation
- Error handling
- Loading state management
- Automated testing
- End-to-end testing
- Debugging full-stack data flow
- Working with real-world test data

---

# Future Improvements

Potential future improvements include:

- Authentication and authorization
- Role-Based Access Control (RBAC)
- Employee profile images
- CSV/Excel export
- PDF reports
- Email notifications
- Dark mode
- Audit logs
- Advanced analytics
- Salary analytics
- Employee attendance tracking
- Performance management
- Dashboard export functionality

---

# Internship Task

This project was developed as part of my **Full Stack Developer internship at NeuroFive Solutions**.

The project focused on building a complete employee management platform, transforming backend employee data into a clean and responsive management dashboard, and validating the application through automated frontend, backend, and end-to-end tests.

### Development Flow

```text
Backend Employee Data
        ↓
MongoDB Queries & Aggregation
        ↓
Express REST API
        ↓
Axios API Integration
        ↓
Zustand State Management
        ↓
React Dashboard
        ↓
Charts & Statistics
        ↓
Responsive User Interface
        ↓
Automated Testing
```

---

# Author

**Sabeer Alam**

Full Stack Web Developer

GitHub:  
https://github.com/sabeerdeveloper555

LinkedIn:  
https://www.linkedin.com/in/sabeer-alam/

---

# License

This project was developed for educational purposes and internship learning at **NeuroFive Solutions**.