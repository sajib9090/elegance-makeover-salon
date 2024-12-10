/* eslint-disable react/prop-types */
import { toast } from "sonner";
import {
  useDeleteTempOrderMutation,
  useUpdateTempOrderQuantityMutation,
} from "../../../redux/features/tempOrderLog/tempOrderLogApi";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
import Modal from "../../Modal/Modal";
import SellDone from "../SellDone/SellDone";
import { IoTrashBin } from "react-icons/io5";

const DetailsModal = ({ setIsOpen, isOpen, carts, customer }) => {
  const totalAmount = carts?.data?.reduce(
    (total, item) => total + item?.quantity * item?.price,
    0
  );

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
                      <IoTrashBin
                        disabled={deleteLoading}
                        onClick={() => handleDelete(item?.temp_order_log_id)}
                        className="mx-auto"
                      />
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
                    colSpan="3"
                    className="border border-gray-200 p-2 font-bold text-right"
                  >
                    Total Amount:
                  </td>
                  <td className="border border-gray-200 p-2 text-right font-bold">
                    <CurrencyFormatter value={totalAmount} />
                  </td>
                </tr>
              </tfoot>
            </table>
            <SellDone
              carts={carts}
              totalBill={totalAmount}
              customer={customer}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default DetailsModal;
