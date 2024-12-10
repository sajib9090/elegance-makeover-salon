import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useGetSingleInvoiceByIdQuery } from "../../redux/features/soldInvoice/soldInvoiceApi";
import defaultLogo from "../../assets/logo/Screenshot_2024-12-06_100318-removebg-preview.png";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import CurrencyFormatter from "../../components/CurrencyFormatter/CurrencyFormatter";

const SingleInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const user = useSelector(currentUser);

  const { data, isLoading } = useGetSingleInvoiceByIdQuery(id, { skip: !id });

  // Function to handle print
  const handlePrint = () => {
    const printContent = document.getElementById("invoice-section").innerHTML;
    const originalContent = document.body.innerHTML;

    // Replace the body content with the invoice content
    document.body.innerHTML = printContent;

    // Trigger the print
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;

    // Reload the page to restore event bindings
    window.location.reload();
  };

  // Function to navigate back to the sell route
  const handleBackToSell = () => {
    navigate("/sell"); // Adjust "/sell" to your desired sell route
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        id="invoice-section"
        className="w-[300px] mx-4 border border-gray-300 rounded-lg p-4 shadow-md bg-white print:w-full print:border-none print:shadow-none print:rounded-none print:p-0"
      >
        {/* Header */}
        <div className="text-center mb-4 px-4">
          <img
            src={user?.brand?.brand_logo?.url || defaultLogo}
            alt="Brand Logo"
            className="w-16 mx-auto"
          />
          <h1 className="text-lg font-bold capitalize">
            {user?.brand?.brand_name || "Brand Name"}
          </h1>
          <p className="text-sm text-gray-500">
            {data?.brand?.address || "Address"}
          </p>
        </div>

        {/* Customer Details */}
        <div className="mb-4">
          <p className="text-[13px] capitalize">
            <span className="font-bold">Customer:</span>{" "}
            {data?.data?.customer_name}
          </p>
          <p className="text-[13px]">
            <span className="font-bold">Mobile:</span>{" "}
            {data?.data?.customer_mobile}
          </p>
          <p className="text-[13px]">
            <span className="font-bold capitalize">Served By:</span>{" "}
            {data?.data?.served_by}
          </p>
        </div>

        {/* Items */}
        <table className="w-full text-[12px] mb-4">
          <thead>
            <tr className="text-left border-b">
              <th className="py-1">Service</th>
              <th className="py-1">Qty</th>
              <th className="py-1 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.items?.map((item, index) => (
              <tr key={index}>
                <td className="py-1">{item?.service_name}</td>
                <td className="py-1">{item?.quantity}</td>
                <td className="py-1 text-right">
                  <CurrencyFormatter value={item?.price} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="text-right border-t pt-2 mb-4">
          <span className="font-bold text-lg flex items-center justify-end gap-4">
            <span>Total Bill:</span>
            <CurrencyFormatter value={data?.data?.total_bill} />
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-4 print:hidden flex gap-12">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          Print Invoice
        </button>
        <button
          onClick={handleBackToSell}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Back to Sell
        </button>
      </div>
    </div>
  );
};

export default SingleInvoice;
