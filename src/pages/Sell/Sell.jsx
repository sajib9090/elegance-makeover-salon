import { Link } from "react-router-dom";
import AddNewCustomerRequest from "../../components/Sell/AddNewCustomerRequest/AddNewCustomerRequest";
import { useState } from "react";
import { useGetAllTempServicesQuery } from "../../redux/features/tempCustomer/tempCustomer";
import LiveTimeCounter from "../../components/LiveTimeCounter/LiveTimeCounter";

const Sell = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetAllTempServicesQuery({
    searchValue: searchValue,
  });

  return (
    <div className="px-4 py-6">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link to={"/dashboard"} className="text-gray-400">
            Dashboard {">"}{" "}
          </Link>
          <Link to={"/dashboard/services"}>Sell ({data?.data?.length})</Link>
        </div>
        <p className="text-[14px] capitalize">list of Pending Services</p>
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
        {/* Background Embellishments */}
        <div className="absolute inset-0 -z-10 opacity-10 bg-[url('/path-to-your-pattern.png')]"></div>

        {isLoading ? (
          <p className="text-center text-gray-500 font-medium">Loading...</p>
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
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
                <span className="text-base">Pending By: {item?.served_by}</span>
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
            </Link>
          ))
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
