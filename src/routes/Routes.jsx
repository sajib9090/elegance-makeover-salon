/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
import FullPageLoader from "../components/FullPageLoader/FullPageLoader";
import Error from "../pages/Error/Error";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Customers from "../pages/Dashboard/Customers/Customers";
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
const UserDetailsWithBrand = lazy(() =>
  import("../pages/Dashboard/Users/UserDetailsWithBrand/UserDetailsWithBrand")
);
const DetailsReport = lazy(() =>
  import("../pages/Reports/DetailsReport/DetailsReport")
);
const MonthWiseReport = lazy(() =>
  import("../pages/Reports/MonthWiseReport/MonthWiseReport")
);
const SingleCustomer = lazy(() =>
  import("../pages/Dashboard/Customers/SingleCustomer/SingleCustomer")
);
const EmployeeSalesReport = lazy(() =>
  import("../pages/Dashboard/Employees/EmployeeSalesReport/EmployeeSalesReport")
);
const Plans = lazy(() => import("../pages/Plans/Plans"));
const SinglePlan = lazy(() => import("../pages/Plans/SinglePlan/SinglePlan"));
const Payment = lazy(() => import("../pages/Dashboard/Payment/Payment"));


export const router = createBrowserRouter(
  [
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
          path: "/dashboard/customers",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <Customers />
            </Suspense>
          ),
        },
        {
          path: "/dashboard/customers/:id",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <SingleCustomer />
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
          path: "/reports/details-report",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <DetailsReport />
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
          path: "/reports/query-broad",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <MonthWiseReport />
            </Suspense>
          ),
        },
        {
          path: "/reports/employee-sales-report",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <EmployeeSalesReport />
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
        {
          path: "/user-details-with-brand/:id",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <UserDetailsWithBrand />
            </Suspense>
          ),
        },
        {
          path: "/dashboard/plans",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <Plans />
            </Suspense>
          ),
        },
        {
          path: "/dashboard/plans/:id",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <SinglePlan />
            </Suspense>
          ),
        },
        {
          path: "/dashboard/payments",
          element: (
            <Suspense fallback={<FullPageLoader />}>
              <Payment />
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
    {
      path: "/login/forgot-password",
      element: <ForgotPassword />,
      errorElement: <h1>Error</h1>,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
