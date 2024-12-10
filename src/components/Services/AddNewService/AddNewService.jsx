import { useState } from "react";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { toast } from "sonner";
import AddButton from "../../AddButton/AddButton";
import Modal from "../../Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useAddNewServiceMutation } from "../../../redux/features/service/serviceApi";

const AddNewService = () => {
  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategoriesQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    service_name: "",
    price: "",
    category: "",
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

  const [addNewService, { isLoading: addLoading }] = useAddNewServiceMutation();

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const data = {
      service_name: formData?.service_name,
      price: formData?.price,
      category: formData?.category,
    };

    try {
      const res = await addNewService(data).unwrap();
      if (res?.success) {
        setIsOpen(false);
        setFormData({
          medicine_name: "",
          price: "",
          category: "",
        });
        toast.success(res?.message || res?.data?.message);
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  const isLoading = categoryLoading;

  return (
    <>
      <div className="flex items-end justify-end">
        <AddButton
          text={"Add New Service"}
          onclick={() => {
            setIsOpen(!isOpen);
            setErrorMessage("");
          }}
        />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddMedicine}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="medicine_name">
              Service Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              placeholder="Service name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="">
                {categoryLoading ? "Please wait..." : "Select Category"}
              </option>
              {categories?.data?.map((category) => (
                <option key={category?._id} value={category?.category}>
                  {category?.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="purchase_price">
              Price
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </div>

          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={
              !formData?.service_name ||
              !formData?.category ||
              !formData?.price ||
              addLoading ||
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

export default AddNewService;
