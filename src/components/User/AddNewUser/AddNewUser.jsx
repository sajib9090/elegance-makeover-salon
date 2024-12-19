import { useState } from "react";
import { toast } from "sonner";
import AddButton from "../../AddButton/AddButton";
import Modal from "../../Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useAddNewUserMutation } from "../../../redux/features/auth/authApi";

const AddNewUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    password: "",
    role: "",
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

  const [addNewUser, { isLoading }] = useAddNewUserMutation();

  const handleAddUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await addNewUser(formData).unwrap();
      toast.success(res?.message || "User added successfully!");
      setIsOpen(false);
      setFormData({
        name: "",
        username: "",
        mobile: "",
        password: "",
        role: "",
      });
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <div className="flex items-end justify-end">
        <AddButton text={"Add New User"} onclick={() => setIsOpen(!isOpen)} />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddUser}>
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
            <label className="block text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
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
          <div className="mb-4 relative">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="flex items-center">
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="role">
              Role
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded mt-1"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={
              !formData?.name ||
              !formData?.username ||
              !formData?.mobile ||
              !formData?.password ||
              !formData?.role ||
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

export default AddNewUser;
