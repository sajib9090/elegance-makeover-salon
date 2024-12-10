import { useState } from "react";

import { toast } from "sonner";
import AddButton from "../../AddButton/AddButton";
import Modal from "../../Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useGetAllEmployeesQuery } from "../../../redux/features/employee/employeeApi";
import { useAddNewTempCustomerMutation } from "../../../redux/features/tempCustomer/tempCustomer";

const AddNewCustomerRequest = () => {
  const { data: employees, isLoading: employeeLoading } =
    useGetAllEmployeesQuery({ searchValue: "", limitValue: "", pageValue: "" });

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    served_by: "",
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

  const [addNewTempCustomer, { isLoading: addLoading }] =
    useAddNewTempCustomerMutation();

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const data = {
      name: formData?.name,
      mobile: formData?.mobile,
      served_by: formData?.served_by,
    };

    try {
      const res = await addNewTempCustomer(data).unwrap();
      if (res?.success) {
        setIsOpen(false);
        setFormData({
          name: "",
          mobile: "",
          served_by: "",
        });
        toast.success(res?.message || res?.data?.message);
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  const isLoading = employeeLoading;

  return (
    <>
      <div className="flex items-end justify-end">
        <AddButton
          text={""}
          onclick={() => {
            setIsOpen(!isOpen);
            setErrorMessage("");
          }}
        />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddMedicine}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Customer Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Customer name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="mobile">
              Mobile (optional)
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Customer mobile"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="employee">
              Employee
            </label>
            <select
              name="served_by"
              value={formData.served_by}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="">
                {employeeLoading ? "Please wait..." : "Select Employee"}
              </option>
              {employees?.data?.map((employee) => (
                <option key={employee?._id} value={employee?.name}>
                  {employee?.name}
                </option>
              ))}
            </select>
          </div>

          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={
              !formData?.name || !formData?.served_by || addLoading || isLoading
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

export default AddNewCustomerRequest;
