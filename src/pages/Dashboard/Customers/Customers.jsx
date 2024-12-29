import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import { useState } from "react";
import { useGetAllCustomersQuery } from "../../../redux/features/customer/customerApi";

const Customers = () => {
  const [resultPerPage, setResultPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const { data: customers, isLoading } = useGetAllCustomersQuery({
    searchValue: searchValue,
    pageValue: page,
    limitValue: resultPerPage,
  });

  return (
    <div className="py-6 px-4">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link to={"/dashboard"} className="text-gray-400">
            Dashboard {">"}{" "}
          </Link>
          <Link to={"/dashboard/customers"}>
            Customers ({customers?.data_found})
          </Link>
        </div>
        <p className="text-[14px] capitalize">List of Customers</p>
      </div>

      <div className="search mt-4">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setPage(1);
          }}
          className="rounded"
          type="search"
          placeholder="Search customers..."
        />
      </div>

      <>
        <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative overflow-x-auto">
          {/* table */}
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[12px] sm:text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[60%] text-start">Name</th>
                <th className="w-[20%] text-start">Mobile</th>
                <th className="w-[15%] text-end px-4">Total Spent Money</th>
              </tr>
            </thead>
            <tbody>
              {customers?.data?.map((customer, i) => {
                // Calculate total spent money
                const totalSpentMoney = customer?.purchased?.reduce(
                  (sum, purchase) => sum + (purchase?.total_bill || 0),
                  0
                );

                return (
                  <tr
                    onClick={() =>
                      navigate(`/dashboard/customers/${customer.customer_id}`)
                    }
                    key={i}
                    className="border-b border-[#ebebeb] min-h-[40px] w-full sm:text-[16px] hover:bg-blue-100 cursor-pointer"
                  >
                    <td className="pl-4 py-2 text-[12px]">
                      {i + 1 + (page - 1) * resultPerPage}
                    </td>
                    <td className="capitalize text-[12px]">
                      {customer?.name?.length > 40
                        ? customer?.name.slice(0, 40) + "..."
                        : customer?.name}
                    </td>
                    <td className="capitalize text-[12px]">
                      <p>{customer?.mobile}</p>
                    </td>
                    <td className="capitalize text-[12px] text-red-600 text-right px-4">
                      <CurrencyFormatter value={totalSpentMoney} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isLoading && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 sm:left-[50%]">
              <PrimaryLoading message="Please wait..." />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 mb-4">
          <div>
            <label>Result Per Page :</label>
            <select
              value={resultPerPage}
              disabled={customers?.data_found <= 10}
              onChange={(e) => {
                setResultPerPage(e.target.value);
                setPage(1);
              }}
              className="h-[27px] w-[80px] border border-gray-300 rounded ml-2"
            >
              {Array.from({ length: 10 }).map((a, i) => (
                <option key={i} value={i * 10 + 10}>
                  {i * 10 + 10}
                </option>
              ))}
            </select>
          </div>
          {/* pagination */}
          <div className="flex items-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={
                customers?.pagination?.previousPage == null || isLoading
              }
              className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                customers?.pagination?.previousPage != null
                  ? "border border-gray-300 text-black"
                  : "border border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <MdKeyboardArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center px-4">
              <p className="mr-2">Page</p>
              <select
                value={page}
                onChange={(e) => {
                  setPage(e.target.value);
                  setResultPerPage(resultPerPage);
                }}
                className="w-[40px]"
              >
                {Array.from({
                  length: customers?.pagination?.totalPages,
                }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={customers?.pagination?.nextPage == null || isLoading}
              className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                customers?.pagination?.nextPage != null
                  ? "border border-gray-300 text-black"
                  : "border border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <MdKeyboardArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Customers;
