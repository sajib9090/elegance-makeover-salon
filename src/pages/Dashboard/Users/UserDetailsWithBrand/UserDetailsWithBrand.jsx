/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  currentUserToken,
  setUser,
} from "../../../../redux/features/auth/authSlice";
import EditBrand from "../../../../components/User/EditBrand/EditBrand";
import EditUser from "../../../../components/User/EditUser/EditUser";
import {
  useUpdateBrandLogoMutation,
  useUpdateUserAvatarMutation,
} from "../../../../redux/features/auth/authApi";
import { toast } from "sonner";

const UserDetailsWithBrand = () => {
  const token = useSelector(currentUserToken);
  const user = useSelector(currentUser);
  const [updateUserAvatar, { isLoading }] = useUpdateUserAvatarMutation();
  const [updateBrandLogo, { isLoading: updateBrandLoading }] =
    useUpdateBrandLogoMutation();
  const dispatch = useDispatch();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await updateUserAvatar({ avatar: file }).unwrap();
        if (response?.success) {
          const decoded = {
            _id: response?.data?._id,
            name: response?.data?.name,
            username: response?.data?.username,
            user_id: response?.data?.user_id,
            role: response?.data?.role,
            mobile: response?.data?.mobile,
            iat: user?.iat,
            exp: user?.exp,
            createdAt: response?.data?.createdAt,
            banned_user: response?.data?.banned_user,
            avatar: response?.data?.avatar,
            brand: user?.brand,
          };

          const user2 = {
            user: decoded,
            token: token,
          };
          dispatch(setUser(user2));
          toast.success(response?.message || response?.data?.message);
        }
      } catch (error) {
        toast.error(error?.message || error?.data?.message);
      }
    }
  };
  const handleFileSelectBrandLogo = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await updateBrandLogo({ brandLogo: file }).unwrap();
        if (response?.success) {
          const decoded = {
            _id: user._id,
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
            brand: response?.data,
          };

          const user2 = {
            user: decoded,
            token: token,
          };
          dispatch(setUser(user2));
          toast.success(response?.message || response?.data?.message);
        }
      } catch (error) {
        toast.error(error?.message || error?.data?.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-purple-300 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 py-6 px-8 flex flex-col md:flex-row items-center md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg capitalize">
              {user?.brand?.brand_name || "Brand Name"}
            </h1>
            <p className="text-lg text-white mt-2">
              Transforming Beauty with Elegance
            </p>
          </div>
          {user?.brand?.brand_logo?.url ? (
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg">
              {/* Brand Logo */}
              <img
                src={user?.brand?.brand_logo?.url}
                alt="Brand Logo"
                className="w-full h-full rounded-full"
              />

              {/* Upload Overlay */}
              <div
                disabled={updateBrandLoading}
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-full opacity-0 ${
                  updateBrandLoading && "opacity-100"
                } hover:opacity-100 transition-opacity`}
              >
                <label
                  disabled={updateBrandLoading}
                  htmlFor="brand-logo-input"
                  className="cursor-pointer text-center"
                >
                  {updateBrandLoading ? "Uploading" : "Upload"}
                </label>
              </div>
              <input
                disabled={updateBrandLoading}
                type="file"
                id="brand-logo-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelectBrandLogo(e)}
              />
            </div>
          ) : (
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400">
              No Logo
              {/* Upload Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-full opacity-0 hover:opacity-100 transition-opacity ${
                  updateBrandLoading && "opacity-100"
                }`}
              >
                <label
                  disabled={updateBrandLoading}
                  htmlFor="brand-logo-input"
                  className="cursor-pointer text-center"
                >
                  {isLoading ? "Uploading" : "Upload"}
                </label>
              </div>
              <input
                disabled={updateBrandLoading}
                type="file"
                id="brand-logo-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelectBrandLogo(e)}
              />
            </div>
          )}
        </div>

        <div className="p-8 space-y-10">
          {/* Profile Section */}
          <section className="text-center group relative inline-block">
            <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
              {user?.avatar?.url ? (
                <img
                  src={user?.avatar?.url}
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-pink-500 shadow-lg"
                />
              ) : (
                <div className="w-full h-full rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              {/* Upload Button */}

              <button
                disabled={isLoading}
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-full group-hover:opacity-100 opacity-0 ${
                  isLoading && "opacity-100"
                } transition-opacity`}
                onClick={() => document.getElementById("file-input").click()}
              >
                {isLoading ? "Uploading" : " Upload"}
              </button>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e)}
              />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800 capitalize">
              {user?.name || "User Name"}
            </h2>
          </section>

          {/* User Details */}
          <section>
            <div className="border-b-2 border-pink-500 flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-800 pb-2">
                User Details
              </h2>
              <EditUser user={user} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <DetailItem label="Name" value={user?.name} />
              <DetailItem label="Username" value={user?.username} />
              <DetailItem label="Mobile" value={user?.mobile} />
              <DetailItem label="Role" value={capitalize(user?.role)} />
            </div>
          </section>

          {/* Brand Details */}
          <section>
            <div className="border-b-2 border-purple-500 flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-800 pb-2">
                Brand Details
              </h2>
              <EditBrand user={user} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <DetailItem label="Brand Name" value={user?.brand?.brand_name} />
              <DetailItem
                label="Location"
                value={user?.brand?.address?.location}
              />
              <DetailItem
                label="District"
                value={user?.brand?.address?.district}
              />
              <DetailItem
                label="Sub-District"
                value={user?.brand?.address?.sub_district}
              />
              <DetailItem
                label="Mobile1"
                value={user?.brand?.contact?.mobile1}
              />
              <DetailItem
                label="Mobile2"
                value={user?.brand?.contact?.mobile2}
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 py-4 text-center">
          <p className="text-white text-sm font-medium">
            © 2024 Elegance Makeover Salon - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

// DetailItem Component for Reusable Styling
const DetailItem = ({ label, value, valueClass = "text-gray-800" }) => (
  <div>
    <p className="text-sm text-gray-500 capitalize">{label}</p>
    <p className={`text-lg font-medium  ${valueClass}`}>{value || "N/A"}</p>
  </div>
);

// Capitalize helper function
const capitalize = (string) =>
  string?.charAt(0).toUpperCase() + string.slice(1);

export default UserDetailsWithBrand;
