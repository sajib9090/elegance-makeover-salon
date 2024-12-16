/* eslint-disable react/prop-types */
import { useState } from "react";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import Modal from "../../Modal/Modal";
import { toast } from "sonner";
import { useDeleteEmployeeMutation } from "../../../redux/features/employee/employeeApi";
import { IoTrashBin } from "react-icons/io5";

const DeleteEmployee = ({ id, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleRemove = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const [deleteEmployee, { isLoading: deleteLoading }] =
    useDeleteEmployeeMutation();
  const handleRemoveConfirm = async () => {
    if (selectedId) {
      const data = {
        employeeId: selectedId,
      };
      try {
        const res = await deleteEmployee(data).unwrap();
        if (res?.success) {
          setIsOpen(false);
          setSelectedId(null);
          toast.success(res?.message || "Deleted successfully");
        }
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  return (
    <>
      <button
        disabled={deleteLoading || isLoading}
        onClick={() => handleRemove(id)}
        className="flex items-center text-[12px] sm:text-[12px] text-red-600"
      >
        <IoTrashBin className="text-xl text-red-600" />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-[200px]"}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Are you sure?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRemoveConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {deleteLoading ? <PrimaryLoading /> : "Yes"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteEmployee;
