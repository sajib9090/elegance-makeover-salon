/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import Modal from "../../Modal/Modal";
import { useDeleteTempCustomerMutation } from "../../../redux/features/tempCustomer/tempCustomer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PrimaryLoading from "../../Loading/PrimaryLoading";

const DeleteTempCustomer = ({ tempCustomerId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [deleteTempCustomer, { isLoading }] = useDeleteTempCustomerMutation();
  const handleRemove = async () => {
    const data = {
      tempId: tempCustomerId,
    };

    try {
      const response = await deleteTempCustomer(data).unwrap();
      if (response?.success) {
        toast.success(response?.data?.message || response?.message);
        navigate("/sell");
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <IoTrashBin className="text-2xl text-red-700" />
      </button>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-sm"}>
        <div className="p-8 bg-pink-50 backdrop-blur-xl rounded-2xl">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            This action is{" "}
            <span className="text-red-600 font-semibold">irreversible</span>.
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-3 rounded-full text-gray-700 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-2xl"
              onClick={handleRemove}
            >
              {isLoading ? <PrimaryLoading /> : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTempCustomer;
