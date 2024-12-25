/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdEditDocument } from "react-icons/md";
import Modal from "../../Modal/Modal";
import { useEditBrandInfoMutation } from "../../../redux/features/auth/authApi";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserToken,
  setUser,
} from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";

const EditBrand = ({ user }) => {
  const token = useSelector(currentUserToken);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand_name: user?.brand?.brand_name || "",
    location: user?.brand?.address?.location || "",
    district: user?.brand?.address?.district || "",
    sub_district: user?.brand?.address?.sub_district || "",
    mobile1: user?.brand?.contact?.mobile1 || "",
    mobile2: user?.brand?.contact?.mobile2 || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [editBrandInfo, { isLoading }] = useEditBrandInfoMutation();

  const dispatch = useDispatch();

  const handleSave = async () => {
    const data = {
      userId: user?.user_id,
      brand_name: formData?.brand_name,
      location: formData?.location,
      district: formData?.district,
      sub_district: formData?.sub_district,
      mobile1: formData?.mobile1,
      mobile2: formData?.mobile2,
    };

    try {
      const res = await editBrandInfo(data).unwrap();
      if (res?.success) {
        const decoded = {
          _id: user?._id,
          name: user?.name,
          username: user?.username,
          user_id: user?.user_id,
          role: user?.role,
          mobile: user?.mobile,
          iat: user?.iat,
          exp: user?.exp,
          createdAt: user?.createdAt,
          banned_user: user?.banned_user,
          avatar: user?.avatar,
          brand: res?.data,
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
        className="text-2xl text-orange-700"
      >
        <MdEditDocument />
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-sm"}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Edit Brand</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Brand Name</label>
                <input
                  type="text"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Sub-District
                </label>
                <input
                  type="text"
                  name="sub_district"
                  value={formData.sub_district}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile 1</label>
                <input
                  type="text"
                  name="mobile1"
                  value={formData.mobile1}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile 2</label>
                <input
                  type="text"
                  name="mobile2"
                  value={formData.mobile2}
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

export default EditBrand;
