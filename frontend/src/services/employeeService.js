import API from "./axios";

const EMPLOYEE_API = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/employees`;

export const getEmployees = async (params = {}) => {
  const response = await API.get(`${EMPLOYEE_API}/`, { params });
  return response.data;
};

export const getEmployee = async (id) => {
  const response = await API.get(`${EMPLOYEE_API}/${id}`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await API.post(EMPLOYEE_API, employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await API.put(`${EMPLOYEE_API}/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(`${EMPLOYEE_API}/${id}`);
  return response.data;
};

export const getDashboardData = async (range = "all") => {
  const response = await API.get(`/employees/dashboard?range=${range}`);

  return response.data;
};
