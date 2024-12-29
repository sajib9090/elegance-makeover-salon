import { useParams } from "react-router-dom";
import { useGetCustomerByIdQuery } from "../../../../redux/features/customer/customerApi";
import CurrencyFormatter from "../../../../components/CurrencyFormatter/CurrencyFormatter";

const SingleCustomer = () => {
  const { id: customerId } = useParams();
  const { data, isLoading, error } = useGetCustomerByIdQuery(customerId, {
    skip: !customerId,
  });

  if (isLoading) return <div>Loading customer details...</div>;
  if (error) return <div>Error fetching customer details.</div>;

  return (
    <div className="container mx-auto py-8 px-6">
      <h1 className="text-3xl font-semibold text-pink-700 mb-6">
        Customer Details
      </h1>

      <div className="bg-white shadow-xl rounded-lg p-8 mb-8 border-t-4 border-pink-400">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Name:</p>
            <p className="text-lg font-semibold text-gray-800 capitalize">
              {data?.data?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Mobile:</p>
            <p className="text-lg font-semibold text-gray-800">
              {data?.data?.mobile || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Joined At:</p>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(data?.data?.createdAt).toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          Purchase History
        </h2>
        {data?.data?.purchased && data?.data?.purchased?.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-pink-100">
              <tr>
                <th className="px-6 py-4 text-lg">Invoice ID</th>
                <th className="px-6 py-4 text-lg">Items</th>
                <th className="px-6 py-4 text-lg">Total Bill</th>
                <th className="px-6 py-4 text-lg">Served By</th>
                <th className="px-6 py-4 text-lg">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.purchased?.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-pink-50 transition-all duration-200"
                >
                  <td className="px-6 py-4">{invoice?.invoice_id}</td>
                  <td className="px-6 py-4">
                    {invoice?.items?.map((item, idx) => (
                      <div key={idx}>
                        <p className="text-sm">
                          {item?.service_name} ({item?.quantity} x {item?.price}{" "}
                          BDT)
                        </p>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <CurrencyFormatter value={invoice?.total_bill} />
                  </td>
                  <td className="px-6 py-4">{invoice?.served_by || "N/A"}</td>
                  <td className="px-6 py-4">
                    {new Date(invoice?.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No purchase history available.</p>
        )}
      </div>
    </div>
  );
};

export default SingleCustomer;
