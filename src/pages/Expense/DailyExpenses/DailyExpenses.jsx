import { Link } from "react-router-dom";
import { useState } from "react";
import AddNewExpense from "../../../components/Expenses/AddNewExpense/AddNewExpense";
import { useGetAllExpensesByDateQuery } from "../../../redux/features/expense/expenseApi";
import ExpenseTable from "../../../components/Expenses/ExpenseTable/ExpenseTable";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";

const DailyExpenses = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading } = useGetAllExpensesByDateQuery(
    {
      startDate: startDate,
      endDate: endDate,
    },
    { skip: !startDate || !endDate }
  );

  return (
    <div className="py-8 px-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="text-sm font-semibold text-gray-500">
          <Link to={"/expense"} className="hover:text-blue-600">
            Expense &gt;
          </Link>{" "}
          <Link to={"/expense/daily-expenses"} className="text-gray-800">
            Daily Expense
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          Daily Expenses
        </h1>
        <p className="text-sm text-gray-600">
          Track and manage your daily expenses effortlessly.
        </p>
      </div>

      {/* Add New Expense */}
      <div className="pb-4">
        <AddNewExpense />
      </div>

      {/* Date Range Picker */}
      <div className="p-8 bg-white shadow-lg rounded-xl mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Filter Expenses by Date
          </h2>
          <button
            disabled={isLoading}
            className={`px-6 py-2 rounded-md font-medium shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed text-gray-800"
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            {isLoading ? "Loading..." : "Apply Filters"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content Rendering */}
        <div className="mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <PrimaryLoading />
            </div>
          ) : data?.data?.length > 0 ? (
            <ExpenseTable expenses={data?.data || []} />
          ) : (
            <div className="text-center text-gray-500 py-8">
              No expenses found for the selected date range.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyExpenses;
