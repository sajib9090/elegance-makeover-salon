/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
import FullPageLoader from "../components/FullPageLoader/FullPageLoader";
import Error from "../pages/Error/Error";
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
const DateWiseReport = lazy(() =>
  import("../pages/Reports/DateWiseReport/DateWiseReport")
);
const Users = lazy(() => import("../pages/Dashboard/Users/Users"));
const EmployeeDetails = lazy(() =>
  import("../pages/Dashboard/Employees/EmployeeDetails/EmployeeDetails")
);
const Expense = lazy(() => import("../pages/Expense/Expense"));
const UserDetails = lazy(() =>
  import("../pages/Dashboard/Users/UserDetails/UserDetails")
);
const DailyExpenses = lazy(() =>
  import("../pages/Expense/DailyExpenses/DailyExpenses")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <Main />
      </AuthenticatedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/services",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/categories",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/employees",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Employees />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/employees/:id",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <EmployeeDetails />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/users/:id",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <UserDetails />
          </Suspense>
        ),
      },

      {
        path: "/sell",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/sell/:id",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <IndividualCustomerSell />
          </Suspense>
        ),
      },
      {
        path: "/sell/:id/:id",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <SingleInvoice />
          </Suspense>
        ),
      },
      {
        path: "/reports",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Reports />
          </Suspense>
        ),
      },
      {
        path: "/reports/query",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <DateWiseReport />
          </Suspense>
        ),
      },
      {
        path: "/expense",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <Expense />
          </Suspense>
        ),
      },
      {
        path: "/expense/daily-expenses",
        element: (
          <Suspense fallback={<FullPageLoader />}>
            <DailyExpenses />
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
