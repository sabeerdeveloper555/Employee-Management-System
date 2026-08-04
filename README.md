# Employee Management System

A modern, responsive, and full-stack Employee Management System built with the MERN stack. This application enables organizations to efficiently manage employee records through a clean and intuitive interface. It provides complete CRUD functionality, real-time dashboard statistics, search, filtering, sorting, and a responsive user experience.

## Features

- Dashboard with employee statistics
- Add new employees
- Edit employee details
- Delete employees with confirmation
- Search employees by name or email
- Filter employees by department and status
- Sort employees by name, salary, and joining date
- Responsive design for desktop, tablet, and mobile
- Form validation
- Toast notifications
- RESTful API architecture
- MongoDB database integration
- Global error handling
- Clean and scalable project structure

## Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS v4
- React Router DOM
- Axios
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

## Project Structure

```
Employee-Management-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/Employee-Management-System.git
```

```bash
cd Employee-Management-System
```

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-management-system
```

Start the backend server.

```bash
npm run dev
```

## Frontend Setup

Open a new terminal.

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend.

```bash
npm run dev
```

The application will be available at:

```
Frontend:
http://localhost:5173

Backend:
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/employees | Get all employees |
| GET | /api/employees/:id | Get employee by ID |
| POST | /api/employees | Create a new employee |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |
| GET | /api/employees/dashboard | Dashboard statistics |

## Future Improvements

- Authentication and Authorization
- Role-Based Access Control (RBAC)
- Employee Profile Images
- CSV/Excel Export
- PDF Reports
- Pagination
- Email Notifications
- Dark Mode
- Audit Logs

## Learning Outcomes

This project helped me gain practical experience in:

- Building RESTful APIs
- MongoDB data modeling
- React component architecture
- CRUD operations
- State management
- API integration using Axios
- Responsive UI development
- Form validation
- Error handling
- Full-stack application development

## Author

**Sabeer Alam**

Full Stack Web Developer

GitHub: https://github.com/sabeerdeveloper555

LinkedIn: https://www.linkedin.com/in/sabeer-alam/

## License

This project is developed for educational purposes and internship learning.