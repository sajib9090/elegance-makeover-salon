/* eslint-disable react/prop-types */
import { TiDelete } from "react-icons/ti";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { useRemoveEmployeeAdvanceMutation } from "../../../redux/features/employee/employeeApi";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { toast } from "sonner";

const RemoveEmployeeAdvance = ({ advance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [removeEmployeeAdvance, { isLoading }] =
    useRemoveEmployeeAdvanceMutation();
  const handleRemove = async (id) => {
    const data = {
      employeeId: id,
    };

    try {
      const response = await removeEmployeeAdvance(data).unwrap();
      toast.success(response?.data?.message || response?.message);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }

    setIsOpen(false);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Delete Button */}
      <button onClick={openModal}>
        <TiDelete className="text-3xl text-red-600 cursor-pointer" />
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-sm"}>
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600">Are you sure you want to delete?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-800"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => handleRemove(advance?.employee_id)}
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

export default RemoveEmployeeAdvance;
