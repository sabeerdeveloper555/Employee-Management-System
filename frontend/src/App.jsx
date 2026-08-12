import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingOverlay from "./components/common/LoadingOverlay";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Employees = lazy(() => import("./pages/Employees"));
const AddEmployee = lazy(() => import("./pages/AddEmployee"));
const EditEmployee = lazy(() => import("./pages/EditEmployee"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <LoadingOverlay
              visible
              label="Loading page..."
            />
          }
        >
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/employees"
              element={<Employees />}
            />

            <Route
              path="/employees/add"
              element={<AddEmployee />}
            />

            <Route
              path="/employees/edit/:id"
              element={<EditEmployee />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;