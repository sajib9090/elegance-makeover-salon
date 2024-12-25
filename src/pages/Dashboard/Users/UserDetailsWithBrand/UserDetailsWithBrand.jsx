/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/features/auth/authSlice";
import EditBrand from "../../../../components/User/EditBrand/EditBrand";
import EditUser from "../../../../components/User/EditUser/EditUser";

const UserDetailsWithBrand = () => {
  const user = useSelector(currentUser);

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
            <img
              src={user?.brand?.brand_logo?.url}
              alt="Brand Logo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400">
              No Logo
            </div>
          )}
        </div>

        <div className="p-8 space-y-10">
          {/* Profile Section */}
          <section className="text-center">
            {user?.avatar?.url ? (
              <img
                src={user?.avatar?.url}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto border-4 border-pink-500 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
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

          {/* Subscription Info */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 border-b-2 border-purple-500 pb-2">
              Subscription Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <DetailItem
                label="Subscription Status"
                value={user?.subscription_info?.status ? "Active" : "Inactive"}
                valueClass={
                  user?.subscription_info?.status
                    ? "text-green-600"
                    : "text-red-600"
                }
              />
              <DetailItem
                label="Previous Payment Amount"
                value={user?.subscription_info?.previous_payment_amount}
              />
              <DetailItem
                label="Previous Payment Time"
                value={user?.subscription_info?.previous_payment_time}
              />
              <DetailItem
                label="Plan"
                value={user?.selected_plan?.name || "No Plan Selected"}
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
