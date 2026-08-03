import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

const getErrorMessage = (error) => {
  const status = error?.response?.status;

  if (error?.code === "ECONNABORTED" || error?.message === "Network Error") {
    return "Unable to reach the server. Please try again.";
  }

  switch (status) {
    case 400:
      return "The request could not be processed.";
    case 401:
      return "You are not authorized to perform this action.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "This action conflicts with the current data.";
    case 422:
      return "Please review the information provided.";
    case 500:
      return "Something went wrong on the server. Please try again.";
    default:
      return "Unexpected error. Please try again.";
  }
};

API.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  config.headers = headers;

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getErrorMessage(error);

    if (!error?.config?.silent) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default API;
