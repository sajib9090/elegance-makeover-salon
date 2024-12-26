/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import RemoveExpense from "../RemoveExpense/RemoveExpense";

const ExpenseTable = ({ expenses }) => {
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    if (!expenses || !Array.isArray(expenses)) {
      setGroupedExpenses([]);
      setOverallTotal(0);
      return;
    }

    // Group expenses by date
    const grouped = expenses?.reduce((acc, expense) => {
      const date = new Date(expense?.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, items: [], total: 0 };
      }
      acc[date]?.items?.push({
        expense_id: expense?.expense_id,
        employee_id: expense?.employee_id,
        title: expense?.title,
        amount: expense?.total_bill,
      });
      acc[date].total += expense?.total_bill;
      return acc;
    }, {});

    const groupedValues = Object?.values(grouped);

    // Calculate overall total
    const total = groupedValues?.reduce((sum, group) => sum + group?.total, 0);

    setGroupedExpenses(groupedValues);
    setOverallTotal(total);
  }, [expenses]);

  return (
    <div className="py-6 px-2 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Daily Expenses</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[70%]">
                Details
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right w-[15%]">
                Amount
              </th>
              <th className="border border-gray-300 py-2 text-center w-[5%]"></th>
            </tr>
          </thead>
          <tbody>
            {groupedExpenses?.map((group) => (
              <React.Fragment key={group?.date}>
                {/* First Row with Date */}
                {group?.items?.map((item, idx) => (
                  <tr
                    key={`${group?.date}-${idx}`}
                    className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    {/* Show date only for the first row of each group */}
                    <td className="border border-gray-300 px-4 py-2 text-gray-800 font-medium">
                      {idx === 0 ? group?.date : ""}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {item?.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right text-gray-700">
                      {item?.amount?.toLocaleString()} Tk.
                    </td>
                    <td className="border border-gray-300 py-2 text-gray-700 flex items-center justify-center">
                      {!item?.employee_id && (
                        <RemoveExpense id={item?.expense_id} />
                      )}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-pink-100">
                  <td className="border border-gray-300 px-4 py-2 text-gray-800 font-medium"></td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 font-bold text-right">
                    Total:
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-red-700 font-bold">
                    {group?.total?.toLocaleString()} Tk.
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
          {/* Overall Total Row */}
          <tfoot>
            <tr className="bg-lime-100">
              <td className="border border-gray-300 px-4 py-2 text-gray-800 font-medium"></td>
              <td className="border border-gray-300 px-4 py-2 text-gray-700 font-bold text-right">
                Overall Total:
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right text-gray-700 font-bold">
                {overallTotal?.toLocaleString()} Tk.
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
