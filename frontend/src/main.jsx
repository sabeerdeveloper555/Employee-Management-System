import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    <App />
  </ErrorBoundary>
);