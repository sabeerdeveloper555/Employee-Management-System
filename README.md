# Employee Management System

A modern, responsive, and full-stack Employee Management System built with the **MERN stack**.

The application helps organizations manage employee records through a clean and intuitive interface. It includes complete CRUD functionality, employee search and filtering, sorting, pagination, dashboard statistics, data visualization, loading states, error handling, and responsive UI.

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
- Form validation
- Toast notifications
- Automatic pagination adjustment after employee deletion

### Dashboard & Data Visualization

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

### Backend Data Aggregation

Dashboard information is processed on the backend using MongoDB aggregation.

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
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employeeRoutes.js
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
│   │   │   │   ├── DepartmentChart.jsx
│   │   │   │   ├── JoiningTrendChart.jsx
│   │   │   │   └── StatusChart.jsx
│   │   │   └── layout/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── axios.js
│   │   │   └── employeeService.js
│   │   ├── store/
│   │   │   └── dashboardStore.js
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md
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

The backend will run on:

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

Run the frontend:

```bash
npm run dev
```

The frontend will be available at:

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


# Application Flow Diagram

The following diagram shows how a user interacts with the Employee Management System and how data moves through the application:

```text
                         ┌──────────────────────┐
                         │        User          │
                         │  Web Browser / UI    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      React.js        │
                         │  Pages & Components  │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │   Zustand Store      │
                         │   Global App State   │
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
                         └──────────┬───────────┘
                                    │
                         Query / Aggregation
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     REST API JSON    │
                         │       Response       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Dashboard    │
                         │  Tables & Statistics │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  ▼                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │  Bar Chart   │  │ Line Chart   │  │ Donut Chart  │
          │ Departments  │  │ Joining Trend│  │ Employee     │
          │              │  │              │  │ Status       │
          └──────────────┘  └──────────────┘  └──────────────┘
```

---

# Dashboard Architecture

The dashboard follows a simple full-stack data flow:

```text
┌──────────────────────────┐
│       React Dashboard    │
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

A bar chart displays the number of employees across departments such as:

- IT
- HR
- Finance
- Marketing
- Sales

## Joining Trend

A line chart visualizes employee joining activity over time using employee `joiningDate` data.

## Employee Status

A donut chart provides a quick comparison between:

- Active employees
- Inactive employees

## Recent Employees

The dashboard displays the latest employee records with:

- Name
- Email
- Department
- Position
- Status

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

- Loading skeletons
- Error messages
- Empty states
- Retry actions
- Success/error toast notifications

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

---

# Learning Outcomes

This project provided practical experience in:

- Building RESTful APIs
- MongoDB data modeling
- MongoDB aggregation pipelines
- React component architecture
- CRUD operations
- Zustand state management
- API integration using Axios
- Recharts data visualization
- Responsive dashboard development
- Form validation
- Error handling
- Loading state management
- Debugging full-stack data flow
- Working with real-world test data
- Building scalable full-stack applications

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

The dashboard and employee management work focused on transforming backend employee data into a clean, responsive, and meaningful management interface.

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
