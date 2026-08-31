# Employee Management System

A modern, responsive, full-stack **Employee Management System** built with the **MERN stack**.

The application provides a complete interface for managing employee records, including CRUD operations, search, filtering, sorting, pagination, dashboard statistics, data visualization, form validation, error handling, and automated testing.

The application is deployed to production with the frontend and backend hosted separately on **Vercel**.

This project was developed as part of my **Full Stack Developer internship at NeuroFive Solutions**.

---

## Live Application

### Frontend

https://employee-management-system-8zex.vercel.app/

### Backend

The backend is deployed separately on Vercel and is consumed by the production frontend through environment-based API configuration.

---

# Features

## Employee Management

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
- Empty states
- Automatic pagination adjustment after employee deletion
- Prevention of duplicate form submission

---

# Dashboard & Data Visualization

The dashboard provides a real-time overview of employee data and workforce activity.

### Statistics

- Total Employees
- Active Employees
- Inactive Employees
- New Employees during the selected period

### Visualizations

- Employees by Department bar chart
- Employee Joining Trend line chart
- Employee Status donut chart
- Workforce Summary with active/inactive percentages

### Dashboard Features

- Last 7 Days filter
- Last 30 Days filter
- This Year filter
- Dynamic dashboard data
- Responsive charts
- Lazy-loaded chart components
- Chart loading states
- Dashboard loading skeletons
- Dashboard error handling
- Retry functionality
- Responsive layout for desktop, tablet, and mobile

---

# Backend Data Aggregation

Dashboard information is processed by the backend using MongoDB queries and aggregation.

The API provides data for:

- Total employees
- Active employees
- Inactive employees
- New employees
- Department-wise employee distribution
- Employee status distribution
- Employee joining trends

The frontend consumes this data through the employee service layer.

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- Recharts
- Lucide React
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

## Deployment

- Vercel
- MongoDB Atlas
- Environment Variables

---

# Application Architecture

```text
                         ┌─────────────────────────┐
                         │       Web Browser       │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      React + Vite       │
                         │   Pages & Components    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     Employee Service    │
                         │     Axios API Client    │
                         └────────────┬────────────┘
                                      │
                                      │ HTTP Requests
                                      ▼
                         ┌─────────────────────────┐
                         │     Express.js API      │
                         │    RESTful Endpoints   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │ Employee Controller     │
                         │ Validation & Business   │
                         │ Logic                   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   Mongoose Employee     │
                         │        Model            │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │        MongoDB           │
                         │    Employee Database     │
                         └─────────────────────────┘
```

---

# Production Architecture

The application is deployed using separate frontend and backend services.

```text
                     Production Environment

┌──────────────────────────────┐
│          Vercel              │
│        Frontend              │
│                              │
│ React + Vite + Tailwind CSS  │
└──────────────┬───────────────┘
               │
               │ HTTPS API Requests
               ▼
┌──────────────────────────────┐
│          Vercel              │
│         Backend              │
│                              │
│ Node.js + Express + Mongoose │
└──────────────┬───────────────┘
               │
               │ MongoDB Connection
               ▼
┌──────────────────────────────┐
│        MongoDB Atlas         │
│      Employee Database       │
└──────────────────────────────┘
```

Environment variables are used so production API URLs and database credentials are not hardcoded into the application.

---

# Project Structure

```text
Employee-Management-System/
│
├── backend/
│   ├── api/
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
│   │   ├── test/
│   │   ├── App.jsx
│   │   └── main.jsx
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

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/sabeerdeveloper555/Employee-Management-System.git
cd Employee-Management-System
```

---

# Backend Setup

Navigate to the backend:

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

Open a new terminal and navigate to the frontend:

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

# Environment Variables

## Backend

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Frontend

```env
VITE_API_URL=your_backend_api_url
```

For production, the environment variables are configured through Vercel rather than hardcoded in the source code.

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/employees/dashboard` | Get dashboard data |

---

# Validation & Error Handling

Validation is implemented at both frontend and backend levels.

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

The application handles:

- Loading states
- Loading skeletons
- API errors
- Empty states
- Retry actions
- Success notifications
- Error notifications
- Duplicate submission prevention

---

# Testing

The project includes testing across multiple layers:

```text
                    Automated Testing
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      Frontend          Backend             E2E
       Tests             Tests             Tests
          │                │                │
          ▼                ▼                ▼
     Vitest +           Jest +          Playwright
     RTL               Supertest
          │                │                │
          ▼                ▼                ▼
     Components        REST APIs       User Flow
     Interactions      Validation      Browser Testing
```

---

# Frontend Tests

Frontend tests use **Vitest** and **React Testing Library**.

Tests cover:

- Employee form rendering
- Employee creation
- Employee creation failure handling
- Duplicate submission prevention
- Basic component functionality

Run frontend tests:

```bash
cd frontend
npx vitest run
```

Current result:

```text
Test Files: 2 passed
Tests:      6 passed
```

---

# Backend Tests

Backend API tests use **Jest** and **Supertest**.

Tests cover:

- API health check
- Successful employee creation
- Missing full name validation
- Invalid email validation
- Missing phone validation

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

The project uses **Playwright** to test a real browser-based employee creation flow.

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

Run the E2E test:

```bash
cd frontend
npx playwright test tests/employee-flow.spec.js
```

Current result:

```text
1 passed
```

To view the Playwright report:

```bash
npx playwright show-report
```

---

# Deployment

The application was deployed as part of the production deployment and performance phase.

## Frontend Deployment

The React/Vite frontend is deployed on Vercel.

Production URL:

```text
https://employee-management-system-8zex.vercel.app/
```

## Backend Deployment

The Express.js backend is deployed separately on Vercel.

The frontend communicates with the backend through:

```env
VITE_API_URL
```

This avoids hardcoded localhost URLs in production.

## Database

MongoDB Atlas is used as the production database.

The backend connects to MongoDB through:

```env
MONGODB_URI
```

---

# Production Testing

After deployment, the application was tested using the production environment rather than relying only on localhost.

The following functionality was verified:

- Dashboard loading
- Employee listing
- Add employee
- Edit employee
- Delete employee
- Search
- Filtering
- Sorting
- Pagination
- Dashboard statistics
- Department chart
- Joining trend chart
- Employee status chart
- Dashboard filters
- API communication
- Error handling
- Toast notifications
- Responsive layout
- Mobile layout
- Desktop layout

---

# Lighthouse / PageSpeed Performance

A Lighthouse/PageSpeed audit was performed against the deployed production application.

### Final Scores

| Category | Score |
|---|---:|
| Performance | **96** |
| Accessibility | **96** |
| Best Practices | **96** |
| SEO | **91** |

These results were obtained from the deployed Vercel application using PageSpeed Insights.

---

# Performance Improvements

Several improvements were made during the production performance pass.

### 1. Lazy Loading Dashboard Charts

The dashboard charts were changed to lazy-loaded components using React `lazy()`.

```javascript
const DepartmentChart = lazy(
  () => import("../components/dashboard/DepartmentChart")
);

const JoiningTrendChart = lazy(
  () => import("../components/dashboard/JoiningTrendChart")
);

const StatusChart = lazy(
  () => import("../components/dashboard/StatusChart")
);
```

This prevents the chart components from being loaded as part of the initial dashboard bundle.

---

### 2. Chart Loading States

A dedicated loading state was added for asynchronously loaded charts.

```text
Loading chart...
```

This provides visual feedback while chart components are being loaded.

---

### 3. Dashboard Loading Skeleton

Instead of displaying an empty dashboard while API data is loading, skeleton placeholders were added for:

- Dashboard heading
- Statistics cards
- Analytics cards

This improves perceived loading performance and reduces layout shifts.

---

### 4. Dashboard Rendering Optimization

The dashboard was refactored to use:

- `useMemo`
- `useCallback`
- `memo`
- Lazy-loaded chart components

This reduces unnecessary calculations and component re-renders.

---

### 5. Production API Configuration

The frontend previously needed to avoid relying on hardcoded localhost URLs.

The API client now uses:

```javascript
import.meta.env.VITE_API_URL
```

This allows the same frontend codebase to work with both development and production APIs.

---

### 6. Responsive Dashboard Layout

The dashboard was optimized for different screen sizes using responsive Tailwind CSS layouts.

The production application was tested on:

- Desktop
- Tablet-sized layouts
- Mobile

---

# Problems Encountered & Solutions

During development and deployment, several issues were identified and resolved.

## Problem 1: Dashboard Charts Were Not Displaying Correctly

### Issue

The dashboard chart components required the correct data structure from the backend. In addition, the dashboard had unnecessary loading complexity around chart rendering.

### Solution

The dashboard was refactored to:

- Fetch dashboard data directly through the employee service
- Normalize the dashboard response
- Pass dedicated datasets to each chart
- Lazy-load chart components
- Add proper chart loading and empty states

The charts now receive:

```text
departmentData
joiningTrendData
statusData
```

and render correctly with production data.

---

## Problem 2: Dashboard Loading Experience

### Issue

The dashboard could appear empty or incomplete while API data and chart components were loading.

### Solution

Loading skeletons and dedicated chart loaders were introduced.

This provides a stable layout while data is being fetched and charts are being loaded.

---

## Problem 3: Hardcoded Local API URL

### Issue

Using localhost URLs would work during local development but fail after deployment.

### Solution

The frontend API configuration was changed to use:

```env
VITE_API_URL
```

The production Vercel environment now points to the deployed backend API.

---

## Problem 4: Duplicate Toast Notifications

### Issue

Some operations could result in duplicate toast notifications because of duplicated toast provider/import handling.

### Solution

The toast configuration was cleaned up so notifications are displayed consistently without unnecessary duplication.

---

## Problem 5: Add Employee Test Failure

### Issue

The frontend test initially expected the `Discard` action to be a button.

However, the actual application implementation used a link.

### Solution

The test was updated to correctly reflect the real UI:

```text
Discard → Link
```

The test then passed successfully.

This demonstrates that the tests were aligned with the actual user interface rather than forcing the UI to match an incorrect test assumption.

---

## Problem 6: Production vs Local Environment

### Issue

An application can work correctly on localhost but fail after deployment because of differences in API URLs, environment variables, hosting, or database configuration.

### Solution

The complete application was tested against the production deployment.

The frontend, backend, and MongoDB Atlas connection were verified together.

---

## Problem 7: Lighthouse Performance Optimization

### Issue

The initial production audit identified areas where loading behavior and frontend rendering could be improved.

### Solution

The application was optimized using:

- Lazy-loaded dashboard charts
- Loading skeletons
- Chart loading states
- Memoized components
- `useMemo`
- `useCallback`
- Environment-based API configuration
- Responsive layout improvements

The final PageSpeed audit achieved:

```text
Performance:      96
Accessibility:    96
Best Practices:   96
SEO:              91
```

---

# Dashboard Visualizations

## Employees by Department

A bar chart displays employee distribution across departments:

- IT
- HR
- Finance
- Marketing
- Sales

---

## Joining Trend

A line chart visualizes employee joining activity over time using employee `joiningDate` data.

---

## Employee Status

A donut chart compares:

- Active employees
- Inactive employees

---

## Workforce Summary

The workforce summary displays:

- Active employee percentage
- Inactive employee percentage
- Link to view all employees

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
- [x] Backend validation
- [x] Error handling
- [x] Loading states
- [x] Toast notifications
- [x] Duplicate submission prevention

## Dashboard

- [x] Dashboard statistics
- [x] Department bar chart
- [x] Joining trend line chart
- [x] Employee status donut chart
- [x] Dashboard filters
- [x] Backend data integration
- [x] MongoDB aggregation
- [x] Workforce summary
- [x] Responsive dashboard
- [x] Real employee data testing
- [x] Chart loading states
- [x] Dashboard error handling

## Production

- [x] Frontend deployed
- [x] Backend deployed
- [x] Production environment variables
- [x] MongoDB Atlas connection
- [x] Production CRUD testing
- [x] Production API testing
- [x] Desktop testing
- [x] Mobile testing
- [x] PageSpeed audit
- [x] Performance optimization
- [x] SEO essentials

## Automated Testing

- [x] Frontend Vitest tests
- [x] React Testing Library tests
- [x] Backend Jest tests
- [x] Supertest API tests
- [x] Playwright E2E test

---

# Learning Outcomes

This project provided practical experience in:

- Building RESTful APIs
- MongoDB data modeling
- MongoDB aggregation pipelines
- React component architecture
- CRUD operations
- Axios API integration
- Recharts data visualization
- Responsive dashboard development
- Form validation
- Error handling
- Loading state management
- Environment-based configuration
- Production deployment
- Vercel deployment
- MongoDB Atlas
- Automated testing
- End-to-end testing
- Lighthouse performance analysis
- Frontend performance optimization
- Debugging full-stack data flow

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

The project progressed from backend API development and CRUD functionality to a complete production-ready employee management application.

The final phase focused on:

```text
Application Development
        ↓
Automated Testing
        ↓
Production Deployment
        ↓
Environment Configuration
        ↓
Production Testing
        ↓
Lighthouse/PageSpeed Audit
        ↓
Performance Optimization
        ↓
SEO Essentials
        ↓
Responsive Testing
        ↓
Documentation
```

The application was successfully deployed and tested in a production environment.

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