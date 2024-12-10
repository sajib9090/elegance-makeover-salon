/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Sell = lazy(() => import("../pages/Sell/Sell"));
const SingleInvoice = lazy(() => import("../pages/Sell/SingleInvoice"));
const Categories = lazy(() =>
  import("../pages/Dashboard/Categories/Categories")
);
const Services = lazy(() => import("../pages/Dashboard/Services/Services"));
const Employees = lazy(() => import("../pages/Dashboard/Employees/Employees"));
const IndividualCustomerSell = lazy(() =>
  import("../pages/Sell/IndividualCustomerSell")
);
const Reports = lazy(() => import("../pages/Reports/Reports"));
const DateWiseReport = lazy(() => import("../pages/Reports/DateWiseReport/DateWiseReport"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <Main />
      </AuthenticatedRoute>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/services",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/categories",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/employees",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Employees />
          </Suspense>
        ),
      },

      {
        path: "/sell",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/sell/:id",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <IndividualCustomerSell />
          </Suspense>
        ),
      },
      {
        path: "/sell/:id/:id",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <SingleInvoice />
          </Suspense>
        ),
      },
      {
        path: "/reports",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <Reports />
          </Suspense>
        ),
      },
      {
        path: "/reports/query",
        element: (
          <Suspense fallback={"LoadingSpinner"}>
            <DateWiseReport />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <h1>Error</h1>,
  },
]);
