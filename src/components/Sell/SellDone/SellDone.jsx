import { toast } from "sonner";
import { useCreateNewInvoiceMutation } from "../../../redux/features/soldInvoice/soldInvoiceApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import PrimaryLoading from "../../Loading/PrimaryLoading";

/* eslint-disable react/prop-types */
const SellDone = ({ carts, totalBill, customer, discountAmount }) => {
  const [createNewInvoice, { isLoading }] = useCreateNewInvoiceMutation();
  const navigate = useNavigate();

  const handleSellDone = async () => {
    const data = {
      items: carts?.data,
      total_discount: discountAmount || 0,
      total_bill: totalBill,
      customer_name: customer?.name,
      customer_mobile: customer?.mobile,
      served_by: carts?.data?.[0]?.served_by,
    };

    try {
      const response = await createNewInvoice(data).unwrap();
      if (response?.success) {
        toast.success(response?.data?.message || response?.message);
        navigate(`${response?.data}`);
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        disabled={isLoading}
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-pink-600 text-white rounded"
      >
        {isLoading ? <PrimaryLoading /> : "Done"}
      </button>

      {/* Modal */}
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-sm"}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to complete this transaction?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                No
              </button>
              <button
                disabled={isLoading}
                onClick={() => {
                  setIsOpen(false);
                  handleSellDone();
                }}
                className="px-4 py-2 bg-pink-600 text-white rounded"
              >
                {isLoading ? <PrimaryLoading /> : "Yes"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SellDone;
