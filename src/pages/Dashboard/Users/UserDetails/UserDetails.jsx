import { useParams } from "react-router-dom";
import {
  useChangePasswordByAuthorityMutation,
  useGetUserByIdQuery,
} from "../../../../redux/features/auth/authApi";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaIdBadge,
  FaCalendarAlt,
  FaBan,
} from "react-icons/fa";
import { MdOutlineCheckCircle } from "react-icons/md";
import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../../../components/Loading/PrimaryLoading";
import { toast } from "sonner";

const UserDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { data, isLoading, isError } = useGetUserByIdQuery(id, { skip: !id });
  const [changePasswordByAuthority, { isLoading: passwordChangeLoading }] =
    useChangePasswordByAuthorityMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading User Data...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-500">
          Failed to fetch user data. Please try again later.
        </div>
      </div>
    );
  }

  const user = data?.data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "confirmPassword" && value !== formData.newPassword) {
      setErrorMessage("Passwords do not match");
    } else if (value.trim() === "") {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
      newPassword: formData.newPassword,
    };

    try {
      const response = await changePasswordByAuthority(data).unwrap();
      if (response?.success) {
        toast.success(response?.message || response?.data?.message);
        setFormData({ newPassword: "", confirmPassword: "" });
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-500 p-8 text-white text-center">
          <div className="flex justify-center">
            {user?.avatar?.url ? (
              <img
                src={user?.avatar.url}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
                <FaUserAlt size={50} className="text-gray-500" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold mt-4 capitalize">
            {user?.name || "Unnamed User"}
          </h1>
          <p className="text-lg font-light opacity-90 mt-1 capitalize">
            {user?.role || "User Role"}
          </p>
        </div>

        {/* User Details Section */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
          {/* Username */}
          <div className="flex items-center space-x-3">
            <FaIdBadge size={22} className="text-indigo-600" />
            <div>
              <p className="text-sm font-medium">Username</p>
              <p className="text-lg">{user?.username || "N/A"}</p>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center space-x-3">
            <FaPhoneAlt size={22} className="text-indigo-600" />
            <div>
              <p className="text-sm font-medium">Mobile</p>
              <p className="text-lg">{user?.mobile || "N/A"}</p>
            </div>
          </div>

          {/* Account Created */}
          <div className="flex items-center space-x-3">
            <FaCalendarAlt size={22} className="text-indigo-600" />
            <div>
              <p className="text-sm font-medium">Account Created</p>
              <p className="text-lg">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Banned User */}
          <div className="flex items-center space-x-3">
            {user?.banned_user ? (
              <FaBan size={22} className="text-red-500" />
            ) : (
              <MdOutlineCheckCircle size={22} className="text-green-500" />
            )}
            <div>
              <p className="text-sm font-medium">Banned User</p>
              <p
                className={`text-lg ${
                  user?.banned_user ? "text-red-500" : "text-green-500"
                }`}
              >
                {user?.banned_user ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center mt-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-indigo-600 underline text-lg font-medium hover:text-indigo-800 transition-colors duration-200"
            >
              Want to change password?
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-sm"}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={
              !formData.newPassword ||
              !formData.confirmPassword ||
              formData.newPassword !== formData.confirmPassword ||
              isLoading ||
              passwordChangeLoading
            }
            type="submit"
            className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
          >
            {isLoading || passwordChangeLoading ? (
              <PrimaryLoading />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserDetails;
