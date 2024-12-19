import { useState } from "react";
import { toast } from "sonner";
import AddButton from "../../AddButton/AddButton";
import Modal from "../../Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useAddNewExpenseMutation } from "../../../redux/features/expense/expenseApi";

const AddNewExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
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

  const [addNewExpense, { isLoading: addLoading }] = useAddNewExpenseMutation();

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const data = {
      title: formData?.title,
      total_bill: formData?.amount,
    };

    try {
      const res = await addNewExpense(data).unwrap();
      if (res?.success) {
        setIsOpen(false);
        setFormData({
          title: "",
          amount: "",
        });
        toast.success(res?.message || res?.data?.message);
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <div className="flex items-end justify-end">
        <AddButton
          text={"Add Expense"}
          onclick={() => {
            setIsOpen(!isOpen);
            setErrorMessage("");
          }}
        />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddMedicine}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Write details"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="amount">
              Amount
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
            />
          </div>

          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={!formData?.title || !formData?.amount || addLoading}
            type="submit"
            className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
          >
            {addLoading ? <PrimaryLoading /> : "SUBMIT"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddNewExpense;
