# Employee Management System

A modern, responsive, and full-stack Employee Management System built with the MERN stack.

This application enables organizations to efficiently manage employee records through a clean and intuitive interface. It provides complete CRUD functionality, real-time dashboard statistics, data visualization, interactive date-range filtering, search, filtering, sorting, pagination, and a responsive user experience.

---

## Features

### Employee Management

- Add new employees
- Edit employee details
- Delete employees with confirmation
- Search employees by name or email
- Filter employees by department and status
- Sort employees by name, salary, and joining date
- Pagination with 10 employees per page
- Combined search, filtering, sorting, and pagination
- Automatic pagination adjustment after employee deletion
- Form validation
- Toast notifications

### Dashboard & Data Visualization

- Real-time employee statistics
- Total employees statistics
- Active employees statistics
- Inactive employees statistics
- Total departments statistics
- Employees by department bar chart
- Employee joining trend line chart
- Active vs inactive employee donut chart
- Recent employees section
- Workforce summary
- Data insights section
- Responsive charts
- Interactive date-range filter

### Interactive Date Filters

The dashboard supports the following date ranges:

- Last 7 Days
- Last 30 Days
- This Year

Changing the selected date range triggers a new backend request and updates the dashboard statistics and charts using filtered MongoDB data.

### Backend Data Aggregation

Dashboard data is aggregated on the server using MongoDB aggregation pipelines.

The backend calculates:

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
│   │   │   │   ├── DashboardFilter.jsx
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
│   ├── .env.example
│   └── package.json
│
└── README.md

Installation
Clone the Repository
git clone https://github.com/your-username/Employee-Management-System.git
cd Employee-Management-System
Backend Setup

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Create a .env file inside the backend folder:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-management-system

Start the backend development server:

npm run dev

The backend will run on:

http://localhost:5000
Frontend Setup

Open a new terminal and navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Create a .env file inside the frontend folder:

VITE_API_URL=http://localhost:5000/api

Run the frontend:

npm run dev

The frontend will be available at:

http://localhost:5173

API Endpoints
| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| GET    | `/api/employees`           | Get all employees        |
| GET    | `/api/employees/:id`       | Get employee by ID       |
| POST   | `/api/employees`           | Create a new employee    |
| PUT    | `/api/employees/:id`       | Update employee          |
| DELETE | `/api/employees/:id`       | Delete employee          |
| GET    | `/api/employees/dashboard` | Get dashboard statistics |

Dashboard API

The dashboard endpoint supports an interactive date-range parameter:

GET /api/employees/dashboard?range=7d

Available ranges:

7d
30d
year

Example:

GET /api/employees/dashboard?range=30d

The backend filters employee records according to their joiningDate and returns the aggregated dashboard data.

System Architecture
                    ┌─────────────────────┐
                    │      React UI       │
                    │      Dashboard      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Zustand Store     │
                    │ Dashboard State      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Axios API        │
                    │     Request         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Router    │
                    │ /employees/dashboard│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Employee Controller │
                    │ Date Filtering +    │
                    │ Aggregation         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │ Employee Collection │
                    └─────────────────────┘

Dashboard Data Flow

The dashboard uses a complete backend-to-frontend data flow:
User selects date range
        ↓
DashboardFilter
        ↓
Zustand Store
        ↓
getDashboardData()
        ↓
Axios GET Request
        ↓
Express API
        ↓
Employee Controller
        ↓
MongoDB Aggregation
        ↓
Filtered Dashboard Data
        ↓
Zustand State Update
        ↓
React Dashboard
        ↓
Charts + Statistics Updated

Dashboard Visualizations

The dashboard contains multiple visualizations built with Recharts.

1. Employees by Department

A responsive bar chart displays employee distribution across departments.
IT
HR
Finance
Marketing
Sales

This helps identify the number of employees working in each department.

2. Employee Joining Trend

A responsive line chart displays employee joining trends over time.

The chart uses the employee joiningDate field and groups data according to the selected date range.

Examples:

Last 7 Days
      ↓
Daily joining data


Last 30 Days
      ↓
Daily joining data


This Year
      ↓
Monthly joining data
3. Employee Status

A donut chart displays the distribution between:

Active Employees
Inactive Employees

This provides a quick overview of the current workforce status.

Interactive Date Filter

The dashboard includes an interactive date filter.

Available options:

Last 7 Days
Last 30 Days
This Year

When the user changes the filter:

Last 7 Days
     ↓
Backend API
     ↓
MongoDB filtering
     ↓
Aggregation
     ↓
Updated dashboard

The following dashboard sections update automatically:

Statistics cards
Department chart
Joining trend chart
Status chart
Recent employees
Workforce summary
Data insights
Server-Side Dashboard Aggregation

Dashboard statistics are calculated on the backend using MongoDB aggregation pipelines.

The backend performs separate aggregations for:

Employee Statistics
Total Employees
Active Employees
Inactive Employees
Total Departments
Department Statistics
Department
Employee Count
Status Statistics
Active
Inactive
Joining Trend

Employee joining records are grouped by date/month depending on the selected range.

Recent Employees

The latest employee records are retrieved based on joining date and creation date.

Phase 5: Employee Management Enhancements

Phase 5 focused on improving the employee listing experience and making it easier to manage a larger number of employee records.

Implemented Features
Employee search by name or email
Department filtering
Status filtering
Employee sorting by name, salary, and joining date
Pagination with 10 employees per page
Combined Search + Filter + Sort + Pagination
Automatic pagination adjustment after deletion
Empty search result handling
Clear filters functionality
Reset filters and sorting
Backend error handling
Loading and error states
Testing & Edge Cases

The complete employee management workflow was tested with:

Search + Pagination
Department Filter + Pagination
Status Filter + Pagination
Search + Department Filter
Search + Department + Status
Filter + Sorting
Filter + Sorting + Pagination
Search + Filter + Sorting + Pagination
Deleting the last employee on a page
Deleting employees while filters are active
Deleting employees while searching
Empty search results
Clearing filters
Resetting filters and sorting
Backend disconnection
Page refresh after backend errors
Duplicate toast notification handling
Phase 5 Result

All Phase 5 features and edge cases were successfully tested.

The Employees module now provides a complete workflow:

Search
   ↓
Filter
   ↓
Sort
   ↓
Paginate
   ↓
Manage Employees
Phase 6: Dashboard with Data Visualization

Phase 6 focused on transforming raw employee data into meaningful visual insights.

Task Requirements

The dashboard task required:

At least 3 different visualizations
Backend-powered data
Responsive charts
At least one interactive filter
Real-time data changes based on the filter
Demo video showing the dashboard and filter functionality
Implemented Solution

The dashboard now includes:

Stat Cards
    +
Bar Chart
    +
Line Chart
    +
Donut Chart
    +
Interactive Date Filter

The dashboard fetches data directly from the backend and uses MongoDB aggregation to calculate the required statistics.

Challenge Faced During Dashboard Development

While testing the interactive date filter, an issue was discovered:

Last 7 Days
      ↓
No data displayed


Last 30 Days
      ↓
Unexpectedly limited data


This Year
      ↓
Unexpectedly limited data

Initially, the issue appeared to be related to the date filtering or MongoDB aggregation logic.

Debugging Process

The complete data flow was checked:

Dashboard
   ↓
DashboardFilter
   ↓
Zustand
   ↓
Axios
   ↓
Express
   ↓
Controller
   ↓
MongoDB

The employee records in MongoDB were then inspected manually.

The actual issue was found in the test data.

Several employees had future joining dates compared with the current date.

For example:

August 24, 2026
August 31, 2026
September 7, 2026

Since these dates were in the future, they correctly did not fall inside the current date ranges.

Solution

The test employee records were updated with realistic joining dates.

The backend date filtering and aggregation logic was also verified to ensure that:

Last 7 Days returns the correct records
Last 30 Days returns the correct records
This Year returns the correct records
Charts receive the filtered data
Dashboard statistics update correctly

This debugging process highlighted an important development lesson:

A problem that looks like a code issue can sometimes be caused by incorrect or unrealistic test data.

Responsive Design

The dashboard and employee management interface are designed to work across different screen sizes.

Supported layouts include:

Desktop
Laptop
Tablet
Mobile

Charts use Recharts' ResponsiveContainer to automatically adapt to the available width.

Example:

<ResponsiveContainer width="100%" height="100%">

This prevents charts from overflowing or breaking on smaller screens.

System Flow Diagram:
flowchart TD

A([Start]) --> B[Open Employee Management System]

B --> C{Choose Module}

C --> D[Dashboard]
C --> E[Employees]

D --> D1[Select Date Range]

D1 --> D2[Last 7 Days]
D1 --> D3[Last 30 Days]
D1 --> D4[This Year]

D2 --> D5[Send Dashboard API Request]
D3 --> D5
D4 --> D5

D5 --> D6[Express Controller]
D6 --> D7[Filter Employee Data]
D7 --> D8[MongoDB Aggregation]

D8 --> D9[Dashboard Statistics]
D8 --> D10[Department Data]
D8 --> D11[Status Data]
D8 --> D12[Joining Trend]
D8 --> D13[Recent Employees]

D9 --> D14[Update Dashboard]
D10 --> D14
D11 --> D14
D12 --> D14
D13 --> D14

D14 --> D15[Update Charts and Statistics]

E --> F{Select Action}

F --> G[Add Employee]
F --> H[View Employees]
F --> I[Edit Employee]
F --> J[Delete Employee]

G --> G1[Fill Employee Form]
G1 --> G2[Validate Input]

G2 -->|Valid| G3[Send POST Request]
G2 -->|Invalid| G4[Show Validation Error]

G3 --> G5[Save Employee in MongoDB]
G5 --> G6[Show Success Toast]

H --> H1[Fetch Employees]
H1 --> H2[Search Employees]
H1 --> H3[Filter Employees]
H1 --> H4[Sort Employees]
H1 --> H5[Paginate Results]

H2 --> H6[Display Results]
H3 --> H6
H4 --> H6
H5 --> H6

I --> I1[Load Employee Data]
I1 --> I2[Update Information]
I2 --> I3[Send PUT Request]
I3 --> I4[Update MongoDB]
I4 --> I5[Show Success Toast]

J --> J1[Show Confirmation Dialog]
J1 -->|Confirm| J2[Send DELETE Request]
J1 -->|Cancel| H

J2 --> J3[Delete from MongoDB]
J3 --> J4[Show Success Toast]

G6 --> Z([End])
H6 --> Z
I5 --> Z
J4 --> Z
D15 --> Z

Testing Checklist
Employee Management
 Create employee
 Read employees
 Update employee
 Delete employee
 Search employees
 Filter employees
 Sort employees
 Pagination
 Combined filters
 Form validation
 Error handling
 Loading states
 Toast notifications
Dashboard
 Dashboard statistics
 Department bar chart
 Joining trend line chart
 Employee status donut chart
 Backend data integration
 MongoDB aggregation
 Last 7 Days filter
 Last 30 Days filter
 This Year filter
 Charts update after filtering
 Statistics update after filtering
 Responsive charts
 Recent employees
 Workforce summary
 Data insights
 Real employee data testing
Learning Outcomes

This project helped me gain practical experience in:

Building RESTful APIs
MongoDB data modeling
MongoDB aggregation pipelines
React component architecture
CRUD operations
Zustand state management
API integration using Axios
Recharts data visualization
Server-side data filtering
Date-range filtering
Responsive dashboard development
Form validation
Error handling
Debugging full-stack data flow
Working with real-world test data
Building scalable full-stack applications
Future Improvements

Potential future improvements include:

Authentication and Authorization
Role-Based Access Control (RBAC)
Employee Profile Images
CSV/Excel Export
PDF Reports
Email Notifications
Dark Mode
Audit Logs
Advanced analytics
Salary analytics
Employee attendance tracking
Performance management
Dashboard export functionality
Screenshots & Demo

The project includes a responsive dashboard with:

Employee statistics
Department distribution
Employee joining trends
Employee status distribution
Interactive date filtering
Recent employee activity

A demo video is also available showing the dashboard responding to real employee data changes through the interactive date filters.

Internship Task

This project was developed as part of my internship at NeuroFive Solutions.

The dashboard task focused on transforming raw backend data into meaningful visual insights while implementing:

Backend Data
     ↓
Data Aggregation
     ↓
Interactive Filtering
     ↓
Data Visualization
     ↓
Responsive Dashboard
Author

Sabeer Alam

Full Stack Web Developer

GitHub:
https://github.com/sabeerdeveloper555

LinkedIn:
https://www.linkedin.com/in/sabeer-alam/

License

This project is developed for educational purposes and internship learning.
