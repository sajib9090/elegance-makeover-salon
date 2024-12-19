/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../Modal/Modal";
import { IoIosPrint } from "react-icons/io";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import defaultLogo from "../../../assets/logo/Screenshot_2024-12-06_100318-removebg-preview.png";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";

const CustomerInvoice = ({ carts, discountAmount, totalBill, customer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(currentUser);

  const handlePrint = () => {
    const printContent = document.getElementById("invoice-section").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#6B64F1] px-6 py-2 text-white rounded"
      >
        C Copy
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-[310px]"}>
        <div className="w-full flex flex-col items-center">
          {/* Invoice Section */}
          <div
            id="invoice-section"
            className="w-[300px] bg-white rounded-lg p-4 text-black print:w-full print:shadow-none print:border-none print:p-0"
          >
            {/* Header */}
            <div className="text-center mb-2">
              <img
                src={user?.brand?.brand_logo?.url || defaultLogo}
                alt="Brand Logo"
                className="w-12 h-12 mx-auto mb-2"
              />
              <h1 className="text-lg font-bold capitalize">
                {user?.brand?.brand_name || "Brand Name"}
              </h1>
              <p className="text-xs leading-tight">
                {user?.brand?.address?.location || "Location"},{" "}
                {user?.brand?.address?.sub_district || "Sub District"},{" "}
                {user?.brand?.address?.district || "District"} <br />
                +88{user?.brand?.contact?.mobile1 || "01000000000"}, +88
                {user?.brand?.contact?.mobile2 || "01000000000"}
              </p>
            </div>

            <hr className="my-2 border-gray-400" />

            {/* Invoice Info */}
            <div className="text-xs mb-3 mt-4">
              <p className="capitalize">
                <strong>Customer:</strong> {customer?.name}
              </p>
              <p className="capitalize">
                <strong>Mobile:</strong> {customer?.mobile}
              </p>
              <p className="capitalize">
                <strong>Served by:</strong> {customer?.served_by}
              </p>
              <p>{new Date().toLocaleString()}</p>
            </div>

            <hr className="my-2 border-gray-400" />

            {/* Items */}
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Items</th>
                  <th className="text-center py-1">Quantity</th>
                  <th className="text-right py-1">Price</th>
                </tr>
              </thead>
              <tbody>
                {carts?.data?.map((item, index) => (
                  <tr key={index}>
                    <td className="py-1">{item?.service_name}</td>
                    <td className="text-center py-1">{item?.quantity}</td>
                    <td className="text-right py-1">
                      <CurrencyFormatter value={item?.price} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="my-2 border-gray-400" />

            {/* Total */}
            <div className="text-sm flex items-center justify-end gap-4 font-semibold">
              <span>Total Bill:</span>
              <span>
                <CurrencyFormatter value={totalBill} />
              </span>
            </div>
            {discountAmount > 0 && (
              <>
                <div className="text-xs flex items-center justify-end gap-4">
                  <span>Total Discount:</span>
                  <span>
                    <CurrencyFormatter value={discountAmount} />
                  </span>
                </div>
                <div className="text-sm flex items-center justify-end gap-4 font-semibold">
                  <span>Net Bill:</span>
                  <span>
                    <CurrencyFormatter
                      value={
                        totalBill - discountAmount
                      }
                    />
                  </span>
                </div>
              </>
            )}

            <div className="text-[10px] text-center mt-6 font-medium border-b border-t border-black">
              <p className="py-1">
                Thanks for visiting{" "}
                <span className="capitalize">{user?.brand?.brand_name}</span>!
                Come again
              </p>
            </div>

            {/* Footer */}
            <div className="text-center text-[9px] mt-4">
              <p className="italic text-gray-900">
                Software Developed by Sajib Hossain
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="print:hidden w-[300px] flex items-center justify-evenly mt-2">
            <button
              title="press f5"
              onClick={handlePrint}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              <IoIosPrint />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerInvoice;
