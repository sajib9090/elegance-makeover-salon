import { useState } from "react";
import { toast } from "sonner";
import AddButton from "../../AddButton/AddButton";
import Modal from "../../Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useAddNewEmployeeMutation } from "../../../redux/features/employee/employeeApi";

const AddNewEmployees = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    monthly_salary: "",
    mobile: "",
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

  const [addNewEmployee, { isLoading }] = useAddNewEmployeeMutation();

  const handleAddGroup = async (e) => {
    e.preventDefault();
    const data = {
      name: formData?.name,
      designation: formData?.designation,
      mobile: formData?.mobile,
      monthly_salary: formData?.monthly_salary,
    };
    setErrorMessage("");
    try {
      const res = await addNewEmployee(data).unwrap();
      toast.success(res?.message || res?.data?.message);
      setIsOpen(false);
      setFormData({
        name: "",
        designation: "",
        mobile: "",
        monthly_salary: "",
      });
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      <div className="flex items-end justify-end">
        <AddButton
          text={"Add New Employee"}
          onclick={() => setIsOpen(!isOpen)}
        />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddGroup}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="designation">
              Designation
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Manager, Hair styler, IT Expert"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="mobile">
              Mobile
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="salary">
              Salary
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="monthly_salary"
              value={formData.monthly_salary}
              onChange={handleChange}
              placeholder="Salary amount"
            />
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={
              !formData?.name ||
              !formData?.designation ||
              !formData?.mobile ||
              !formData?.monthly_salary ||
              isLoading
            }
            type="submit"
            className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
          >
            {isLoading ? <PrimaryLoading /> : "ADD"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddNewEmployees;
