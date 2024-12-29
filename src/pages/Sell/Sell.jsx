import { Link } from "react-router-dom";
import AddNewCustomerRequest from "../../components/Sell/AddNewCustomerRequest/AddNewCustomerRequest";
import { useState } from "react";
import { useGetAllTempServicesQuery } from "../../redux/features/tempCustomer/tempCustomer";
import LiveTimeCounter from "../../components/LiveTimeCounter/LiveTimeCounter";

const Sell = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, error, isLoading } = useGetAllTempServicesQuery({
    searchValue: searchValue,
  });

  if (error?.status === 402) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-50">
        {/* Error Icon with Decor */}
        <div className="relative">
          <div className="bg-pink-300 p-5 rounded-full shadow-lg animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          </div>
          <div className="absolute top-0 left-0 right-0 -z-10 h-20 w-20 bg-pink-200 rounded-full opacity-50 blur-sm"></div>
        </div>

        {/* Error Message */}

        <p className="text-gray-700 text-center mt-3 px-6 font-light leading-relaxed">
          {error?.data?.message ||
            "This feature is unavailable until your payment is confirmed. Let's get this sorted quickly!"}
        </p>

        {/* Decorative Divider */}
        <div className="w-16 h-1 bg-pink-400 mt-4 rounded-full"></div>

        {/* Retry and Navigate Options */}
        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition transform hover:scale-105"
          >
            Retry
          </button>
          <Link
            to="/dashboard/plans"
            className="px-8 py-3 bg-white border border-pink-300 text-pink-500 rounded-lg shadow-md hover:bg-pink-50 transition transform hover:scale-105"
          >
            View Plans
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 mt-6">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@beautyparlour.com"
            className="text-pink-600 underline"
          >
            saifsajib97@gmail.com
          </a>
        </p>
      </div>
    );
  }

  const getStatus = (item) => {
    if (item?.paid) return { label: "Paid", color: "bg-green-500" };
    return { label: "Pending", color: "bg-yellow-500" };
  };

  return (
    <div className="px-4 py-6">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link to={"/dashboard"} className="text-gray-400">
            Dashboard {">"}{" "}
          </Link>
          <Link to={"/dashboard/services"}>Sell ({data?.data?.length})</Link>
        </div>
        <p className="text-[14px] capitalize">List of Pending Services</p>
      </div>

      <AddNewCustomerRequest />

      <div className="search mt-4">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="rounded"
          type="search"
          placeholder="Search Customer..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 relative cursor-pointer">
        {isLoading ? (
          <p className="text-center text-gray-500 font-medium">Loading...</p>
        ) : data?.data?.length ? (
          data?.data?.map((item) => {
            const status = getStatus(item); // Determine status
            return (
              <Link
                to={item?.temp_customer_id}
                key={item?._id}
                className="border rounded-2xl p-6 shadow-xl bg-gradient-to-b from-pink-100 to-white hover:scale-105 transform transition-all duration-300 hover:shadow-2xl relative"
              >
                {/* Decorative Header Icon */}
                <div className="absolute -top-4 left-4 bg-pink-300 p-3 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16.5 6.5a4.5 4.5 0 01-9 0 4.5 4.5 0 119 0zM12 14l-2-2m0 0l2-2m-2 2h6"
                    />
                  </svg>
                </div>

                {/* Name */}
                <div className="text-xl font-serif font-bold text-pink-800 capitalize mb-3">
                  {item?.name}
                </div>

                {/* Mobile */}
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="text-pink-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 9.828a2 2 0 00-2.828-2.828z"
                      />
                    </svg>
                  </div>
                  <span className="text-base">
                    Mobile: {item?.mobile || "N/A"}
                  </span>
                </div>

                {/* Pending By */}
                <div className="flex items-center space-x-3 text-gray-700 mt-2">
                  <div className="text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c0 3.866-2.686 7-6 7M18 11c0 3.866 2.686 7 6 7M15 3v4"
                      />
                    </svg>
                  </div>
                  <span className="text-base">
                    Pending By: {item?.served_by}
                  </span>
                </div>

                {/* Timer */}
                <div className="flex items-center space-x-3 text-gray-700 mt-2">
                  <div className="text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-base">
                    Time: <LiveTimeCounter startTime={item?.createdAt} />
                  </span>
                </div>

                {/* Status */}
                <div className="mt-4">
                  <span
                    className={`text-white text-sm px-3 py-1 rounded-full ${status.color}`}
                  >
                    {status?.label}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-center text-gray-500 font-medium">
            No data found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Sell;
