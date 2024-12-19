import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllSoldInvoicesByDateQuery } from "../../../redux/features/soldInvoice/soldInvoiceApi";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import FullPageLoader from "../../../components/FullPageLoader/FullPageLoader";

const DateWiseReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryDate = new URLSearchParams(location.search).get("date");

  // Manage selected date state
  const [selectedDate, setSelectedDate] = useState(queryDate || "");

  const { data, isLoading } = useGetAllSoldInvoicesByDateQuery(
    { date: selectedDate },
    { skip: !selectedDate }
  );

  // Calculate the total sell
  const totalSell =
    data?.data?.reduce((sum, invoice) => sum + invoice.total_bill, 0) || 0;
  const totalDiscount =
    data?.data?.reduce((sum, invoice) => sum + invoice.total_discount, 0) || 0;

  // Update the query parameter whenever the date changes
  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    navigate(`/reports/query?date=${newDate}`);
  };

  useEffect(() => {
    if (queryDate !== selectedDate) {
      setSelectedDate(queryDate || "");
    }
  }, [queryDate, selectedDate]);

  return (
    <div className="py-6 px-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto border border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Date-Wise Report
      </h1>
      <div className="flex items-center mb-4">
        <label
          htmlFor="date"
          className="font-medium text-gray-700 text-sm flex-shrink-0 mr-4"
        >
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition w-full"
        />
      </div>
      {selectedDate && (
        <p className="text-center text-gray-700 text-sm mt-2">
          Showing results for:{" "}
          <strong className="text-gray-800">{selectedDate}</strong>
        </p>
      )}
      {isLoading ? (
        <FullPageLoader />
      ) : data?.data?.length ? (
        <>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full w-full border-collapse border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Invoice ID
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Customer Info
                  </th>

                  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-semibold text-gray-700"></th>
                  <th className="px-4 py-2 border border-gray-200 text-end text-sm font-semibold text-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50">
                    <td className="px-2 py-1 border border-gray-200 text-xs text-gray-800">
                      {invoice?.invoice_id}
                    </td>
                    <td className="px-2 py-1 border border-gray-200 text-sm text-gray-800">
                      <span className="flex flex-col">
                        <span className="text-pink-600 capitalize text-xs">
                          {invoice?.customer_name}
                        </span>
                        <span className="text-sm text-blue-600">
                          {invoice?.customer_mobile}
                        </span>
                      </span>
                    </td>
                    <td className="px-2 py-1 border border-gray-200 text-sm text-gray-800 flex flex-col">
                      <span className="capitalize text-[11px] text-green-600">
                        {invoice?.served_by}
                      </span>
                      <span className="text-[10px]">
                        {new Date(invoice?.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-200 text-sm text-gray-800 text-right">
                      <span>
                        <CurrencyFormatter value={invoice?.total_bill} />
                      </span>
                      <span className="text-[9px] text-red-600">
                        <CurrencyFormatter value={invoice?.total_discount} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <div className="text-lg font-medium text-gray-800 text-end flex items-center justify-end space-x-6">
              <span>Total Sell:</span>
              <strong>
                <CurrencyFormatter value={totalSell} />
              </strong>
            </div>
            <div className="text-lg text-gray-800 text-end flex items-center justify-end space-x-6">
              <span>Total Discount:</span>
              <span className="text-red-600">
                <CurrencyFormatter value={totalDiscount} />
              </span>
            </div>
            <div className="text-lg font-medium text-gray-800 text-end flex items-center justify-end space-x-6">
              <span>Net Sell:</span>
              <strong>
                <CurrencyFormatter value={totalSell - totalDiscount} />
              </strong>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No data found for the selected date.
        </p>
      )}
    </div>
  );
};

export default DateWiseReport;
