/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../../Modal/Modal";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { useAddEmployeeAdvanceSalaryMutation } from "../../../redux/features/employee/employeeApi";
import { toast } from "sonner";

const AddSalary = ({ employeeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    payable_amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() === "") {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else {
      setErrorMessage("");
    }
  };

  const [addEmployeeAdvanceSalary, { isLoading }] =
    useAddEmployeeAdvanceSalaryMutation();

  const handleAddAdvanceSalary = async (e) => {
    e.preventDefault();
    const data = {
      employeeId: employeeId,
      payable_amount: formData?.payable_amount,
    };
    setErrorMessage("");
    try {
      const res = await addEmployeeAdvanceSalary(data).unwrap();
      toast.success(res?.message || res?.data?.message);
      setIsOpen(false);
      setFormData({
        payable_amount: "",
      });
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };
  return (
    <div>
      <FaPlusCircle
        onClick={() => setIsOpen(!isOpen)}
        className="text-xl cursor-pointer"
      />

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-xs"}>
        <form onSubmit={handleAddAdvanceSalary}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="payable amount">
              Payable Amount
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="payable_amount"
              value={formData.payable_amount}
              onChange={handleChange}
              placeholder="Payable Amount"
            />
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={!formData?.payable_amount || isLoading}
            type="submit"
            className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
          >
            {isLoading ? <PrimaryLoading /> : "SUBMIT"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddSalary;
