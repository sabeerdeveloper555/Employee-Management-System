import { create } from "zustand";

import { getDashboardData } from "../services/employeeService";

const useDashboardStore = create((set) => ({
  dashboardData: null,
  loading: false,
  error: null,
  selectedRange: "7d",

  fetchDashboardData: async (range = "7d") => {
    try {
      set({
        loading: true,
        error: null,
        selectedRange: range,
      });

      const response = await getDashboardData(range);

      set({
        dashboardData: response?.data || null,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);

      set({
        loading: false,
        error: "Unable to load dashboard data right now.",
      });
    }
  },
}));

export default useDashboardStore;