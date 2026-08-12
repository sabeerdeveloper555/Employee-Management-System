import { create } from "zustand";
import { getEmployees } from "../services/employeeService";

const useEmployeeStore = create((set) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async (params = {}) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getEmployees(params);

      const employeeList = Array.isArray(response?.data)
        ? response.data
        : [];

      set({
        employees: employeeList,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch employees:", error);

      set({
        loading: false,
        error: "Unable to load employees",
      });
    }
  },
}));

export default useEmployeeStore;