import { useState } from "react";
import { useGetAllSoldInvoicesByDateQuery } from "../../../../redux/features/soldInvoice/soldInvoiceApi";
import CurrencyFormatter from "../../../../components/CurrencyFormatter/CurrencyFormatter";

const EmployeeSalesReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const { data, isLoading } = useGetAllSoldInvoicesByDateQuery(
    { month: selectedMonth },
    { skip: !selectedMonth }
  );

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const processData = (data) => {
    const groupedData = {};
    data?.forEach((invoice) => {
      const date = formatDate(invoice?.createdAt);
      const server = invoice?.served_by;

      if (!groupedData[server]) groupedData[server] = {};
      if (!groupedData[server][date]) groupedData[server][date] = [];

      groupedData[server][date]?.push(invoice);
    });
    return groupedData;
  };

  const groupedData = processData(data?.data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl border-t-4 border-pink-400">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-wide capitalize">
          Employee Sales Report
        </h1>
        <div className="mb-6">
          <label
            htmlFor="month"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Select Month
          </label>
          <input
            type="month"
            id="month"
            name="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-gray-700"
          />
        </div>

        {isLoading ? (
          <p className="text-center text-pink-600 animate-pulse">
            Loading sales data...
          </p>
        ) : (
          groupedData && (
            <div className="overflow-x-auto">
              {Object?.keys(groupedData)?.map((server) => {
                let overallTotalSales = 0;
                let overallTotalItems = 0;

                Object.keys(groupedData[server])?.forEach((date) => {
                  const invoices = groupedData[server][date];
                  overallTotalSales += invoices?.reduce(
                    (sum, invoice) => sum + invoice?.total_bill,
                    0
                  );
                  overallTotalItems += invoices?.reduce(
                    (sum, invoice) =>
                      sum +
                      invoice?.items?.reduce(
                        (itemSum, item) => itemSum + item?.quantity,
                        0
                      ),
                    0
                  );
                });

                return (
                  <div
                    key={server}
                    className="mb-8 bg-purple-50 rounded-lg shadow-md p-4"
                  >
                    <h2 className="text-lg font-semibold text-pink-700 mb-4 capitalize">
                      Sales by: {server}
                    </h2>
                    <table className="w-full border-collapse border border-pink-200">
                      <thead className="bg-pink-100">
                        <tr>
                          <th className="border border-pink-300 px-4 py-2 text-left">
                            Date
                          </th>
                          <th className="border border-pink-300 px-4 py-2 text-left">
                            Total Items
                          </th>
                          <th className="border border-pink-300 px-4 py-2 text-left">
                            Total Sales
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(groupedData[server])?.map((date) => {
                          const invoices = groupedData[server][date];
                          const totalSales = invoices?.reduce(
                            (sum, invoice) => sum + invoice?.total_bill,
                            0
                          );
                          const totalItems = invoices?.reduce(
                            (sum, invoice) =>
                              sum +
                              invoice?.items?.reduce(
                                (itemSum, item) => itemSum + item?.quantity,
                                0
                              ),
                            0
                          );

                          return (
                            <tr key={date} className="hover:bg-pink-50">
                              <td className="border border-pink-300 px-4 py-2">
                                {date}
                              </td>

                              <td className="border border-pink-300 px-4 py-2">
                                {totalItems}
                              </td>
                              <td className="border border-pink-300 px-4 py-2">
                                <CurrencyFormatter value={totalSales} />
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="bg-pink-200 font-bold">
                          <td className="border border-pink-300 px-4 py-2">
                            Overall Total
                          </td>
                          <td className="border border-pink-300 px-4 py-2">
                            {overallTotalItems}
                          </td>
                          <td className="border border-pink-300 px-4 py-2">
                            <CurrencyFormatter value={overallTotalSales} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EmployeeSalesReport;
