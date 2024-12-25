/* eslint-disable react/prop-types */
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserToken,
  setUser,
} from "../../../redux/features/auth/authSlice";
import { useState } from "react";
import { useEditUserInfoMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import Modal from "../../Modal/Modal";

const EditUser = ({ user }) => {
  const token = useSelector(currentUserToken);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    mobile: user?.mobile || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [editUserInfo, { isLoading }] = useEditUserInfoMutation();

  const dispatch = useDispatch();

  const handleSave = async () => {
    const data = {
      name: user?.name,
      username: formData?.username,
      mobile: formData?.mobile,
    };

    try {
      const res = await editUserInfo(data).unwrap();
      if (res?.success) {
        const decoded = {
          _id: res?.data?._id,
          name: res?.data?.name,
          username: res?.data?.username,
          user_id: res?.data?.user_id,
          role: res?.data?.role,
          mobile: res?.data?.mobile,
          iat: user?.iat,
          exp: user?.exp,
          createdAt: res?.data?.createdAt,
          banned_user: res?.data?.banned_user,
          avatar: res?.data?.avatar,
          brand: user?.brand,
        };

        const user2 = {
          user: decoded,
          token: token,
        };

        dispatch(setUser(user2));
        toast.success(res?.message || res?.data?.message);
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-green-700"
      >
        <FaUserEdit />
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-sm"}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Mobile </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-orange-600 rounded hover:bg-orange-700"
                >
                  {isLoading ? <PrimaryLoading /> : " Save"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditUser;
