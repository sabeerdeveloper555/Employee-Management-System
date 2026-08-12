import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,

        style: {
          borderRadius: "12px",
          background: "#0F172A",
          color: "#FFFFFF",
          padding: "12px 16px",
          fontSize: "14px",
        },

        success: {
          duration: 3000,
        },

        error: {
          duration: 4000,
        },
      }}
    />

    <App />
  </ErrorBoundary>
);