/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa6";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useRemoveExpenseMutation } from "../../../redux/features/expense/expenseApi";
import { toast } from "sonner";
import PrimaryLoading from "../../Loading/PrimaryLoading";

const RemoveExpense = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [removeExpense, { isLoading }] = useRemoveExpenseMutation();
  const handleRemove = async () => {
    const data = {
      expenseId: id,
    };
    try {
      const response = await removeExpense(data).unwrap();
      toast.success(response?.data?.message || response?.message);
      setIsOpen(false);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <FaTrash className="text-violet-900" />
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-xs"}>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Confirm Removal</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to remove this expense?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleRemove}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                {isLoading ? <PrimaryLoading /> : "Confirm"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RemoveExpense;
