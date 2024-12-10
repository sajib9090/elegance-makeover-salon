import { toast } from "sonner";
import { useCreateNewInvoiceMutation } from "../../../redux/features/soldInvoice/soldInvoiceApi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const SellDone = ({ carts, totalBill, customer }) => {
  const [createNewInvoice, { isLoading }] = useCreateNewInvoiceMutation();
  const navigate = useNavigate();

  const handleSellDone = async () => {
    const data = {
      items: carts?.data,
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
  return (
    <>
      <div className="flex items-center justify-end mt-4">
        <button
          disabled={isLoading}
          onClick={handleSellDone}
          className="px-6 py-2 bg-pink-600 text-white rounded"
        >
          Done
        </button>
      </div>
    </>
  );
};

export default SellDone;
