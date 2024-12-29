/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteTempOrderMutation,
  useUpdateTempOrderQuantityMutation,
} from "../../../redux/features/tempOrderLog/tempOrderLogApi";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
import Modal from "../../Modal/Modal";
import SellDone from "../SellDone/SellDone";
import { IoTrashBin } from "react-icons/io5";
import { useUpdateTempCustomerMarkedAsPaidMutation } from "../../../redux/features/tempCustomer/tempCustomer";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import CustomerInvoice from "../CustomerInvoice/CustomerInvoice";

const DetailsModal = ({ setIsOpen, isOpen, carts, customer }) => {
  const [discountAmount, setDiscountAmount] = useState("");
  const [updateTempCustomerMarkedAsPaid, { isLoading: updateLoading }] =
    useUpdateTempCustomerMarkedAsPaidMutation();

  const totalAmount = carts?.data?.reduce(
    (total, item) => total + item?.quantity * item?.price,
    0
  );
  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setDiscountAmount(value);
    }
  };

  const discountedTotal = totalAmount - discountAmount;

  const [updateTempOrderQuantity, { isLoading }] =
    useUpdateTempOrderQuantityMutation();

  const handleQuantityDecrease = async (item) => {
    const data = {
      tempOrderLogId: item?.temp_order_log_id,
      decrease: true,
    };

    try {
      const result = await updateTempOrderQuantity(data).unwrap();
      toast.success(result?.data?.message || result?.message);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const handleQuantityIncrease = async (item) => {
    const data = {
      tempOrderLogId: item?.temp_order_log_id,
      increase: true,
    };

    try {
      const result = await updateTempOrderQuantity(data).unwrap();
      toast.success(result?.data?.message || result?.message);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const [deleteTempOrder, { isLoading: deleteLoading }] =
    useDeleteTempOrderMutation();
  const handleDelete = async (id) => {
    const data = {
      tempId: id,
    };

    try {
      const response = await deleteTempOrder(data).unwrap();
      if (response?.success) {
        toast.success("Successfully removed");
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      const response = await updateTempCustomerMarkedAsPaid(
        customer?.temp_customer_id
      ).unwrap();

      if (response?.success) {
        toast.success("Marked as Paid");
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <>
      {carts?.data?.length > 0 && (
        <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-3xl"}>
          {/* Invoice Header */}
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-lg font-bold text-gray-700">Invoice Details</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              Close
            </button>
          </div>

          {/* Customer Info */}
          <div className="mt-4 mb-6">
            <p className="text-sm text-gray-700 capitalize">
              <span className="font-bold">Customer Name:</span>{" "}
              {customer?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-700 capitalize">
              <span className="font-bold">Served By:</span>{" "}
              {carts?.data[0]?.served_by || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Date:</span>{" "}
              {new Date()?.toLocaleDateString()}
            </p>
          </div>

          {/* Discount Input */}
          <div className="my-4">
            <label className="block text-sm font-bold text-gray-700 text-end">
              Discount Amount:
            </label>
            <input
              type="text"
              value={discountAmount}
              onChange={handleDiscountChange}
              className="w-full mt-2 px-4 py-2 border rounded text-right"
              placeholder="Enter discount amount"
            />
          </div>

          {/* Invoice Table */}
          <div>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 p-2 text-center"></th>
                  <th className="border border-gray-200 p-2 text-left">Item</th>
                  <th className="border border-gray-200 p-2 text-right">
                    Price
                  </th>
                  <th className="border border-gray-200 p-2 text-center">
                    Quantity
                  </th>
                  <th className="border border-gray-200 p-2 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts?.data?.map((item, index) => (
                  <tr
                    key={item?._id}
                    className={`${index % 2 === 0 ? "bg-pink-50" : "bg-white"}`}
                  >
                    <td className="border border-gray-200 p-2 text-center cursor-pointer">
                      <button disabled={deleteLoading}>
                        <IoTrashBin
                          onClick={() => handleDelete(item?.temp_order_log_id)}
                          className="mx-auto"
                        />
                      </button>
                    </td>
                    <td className="border border-gray-200 p-2 capitalize">
                      {item?.service_name}
                    </td>
                    <td className="border border-gray-200 p-2 text-right">
                      <CurrencyFormatter value={item?.price} />
                    </td>
                    <td className="border border-gray-200 p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleQuantityDecrease(item)}
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 text-xs rounded"
                          disabled={item?.quantity <= 1 || isLoading}
                        >
                          -
                        </button>
                        <span className="px-2">{item?.quantity}</span>
                        <button
                          disabled={isLoading}
                          onClick={() => handleQuantityIncrease(item)}
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 text-xs rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-200 p-2 text-right">
                      <CurrencyFormatter value={item?.quantity * item?.price} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-200 p-2 font-bold text-right"
                  >
                    Total Amount:
                  </td>
                  <td className="border border-gray-200 p-2 text-right font-bold">
                    <CurrencyFormatter value={totalAmount} />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-200 p-2 font-bold text-right"
                  >
                    Discount:
                  </td>
                  <td className="border border-gray-200 p-2 text-right font-bold">
                    <CurrencyFormatter value={discountAmount} />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-200 p-2 font-bold text-right"
                  >
                    Net Amount:
                  </td>
                  <td className="border border-gray-200 p-2 text-right font-bold">
                    <CurrencyFormatter value={discountedTotal} />
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="flex items-center justify-between mt-4">
              <CustomerInvoice
                carts={carts}
                discountAmount={discountAmount}
                totalBill={discountedTotal}
                customer={customer}
              />
              <button
                disabled={updateLoading}
                onClick={handleMarkAsPaid}
                className={`${
                  customer?.paid
                    ? "bg-green-700 animate-pulse"
                    : "bg-red-600 hover:bg-red-700"
                } px-6 py-2 text-white rounded`}
              >
                {updateLoading ? (
                  <PrimaryLoading />
                ) : customer?.paid ? (
                  "Paid ✓"
                ) : (
                  "Paid"
                )}
              </button>
              <SellDone
                carts={carts}
                discountAmount={discountAmount}
                totalBill={discountedTotal}
                customer={customer}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DetailsModal;
