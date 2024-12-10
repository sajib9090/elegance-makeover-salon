import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import AddNewService from "../../../components/Services/AddNewService/AddNewService";
import { useState } from "react";
import { useGetAllServicesQuery } from "../../../redux/features/service/serviceApi";
import { CiFilter } from "react-icons/ci";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";
import DeleteService from "../../../components/Services/DeleteService/DeleteService";
import { Link } from "react-router-dom";

const Services = () => {
  const [resultPerPage, setResultPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const { data: services, isLoading } = useGetAllServicesQuery({
    searchValue: searchValue,
    pageValue: page,
    limitValue: resultPerPage,
    sortPrice: priceValue,
    category: categoryValue,
  });

  const categories = Array.from(
    new Set(
      services?.data?.map((service) => service?.category)?.filter(Boolean)
    )
  );

  return (
    <div className="py-6 px-4">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link to={"/dashboard"} className="text-gray-400">
            Dashboard {">"}{" "}
          </Link>
          <Link to={"/dashboard/services"}>
            Services ({services?.data?.length})
          </Link>
        </div>
        <p className="text-[14px] capitalize">list of Services</p>
      </div>

      <AddNewService />

      <div className="pt-6 pb-4 gap-4 sm:gap-2 flex items-center justify-between">
        <div className="selectOp flex items-center">
          <CiFilter className="h-6 w-6 mr-2" />
          <select
            value={priceValue}
            onChange={(e) => {
              setPriceValue(e.target.value);
              setSearchValue("");
            }}
            name=""
            className="rounded"
          >
            <option value="" disabled>
              Filter with Price
            </option>
            <option value="high">High To Low</option>
            <option value="low">Low To High</option>
          </select>
        </div>

        <div className="selectOp flex items-center ">
          <CiFilter className="h-6 w-6 mr-2" />
          <select
            value={categoryValue}
            onChange={(e) => {
              setCategoryValue(e.target.value);
              setPriceValue("");
              setSearchValue("");
            }}
            name=""
            className="rounded"
          >
            <option value="">
              {isLoading ? "Please wait..." : "Filter with Category"}
            </option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {priceValue || searchValue || categoryValue ? (
        <div className="mt-2 flex items-center justify-end">
          <button
            onClick={() => {
              setSearchValue("");
              setPriceValue("");
              setCategoryValue("");
            }}
            className="flex items-center justify-center text-red-600 underline"
            title="reset filter"
          >
            <CiFilter className="h-6 w-6 mr-1" /> Reset filter
          </button>
        </div>
      ) : null}

      <div className="search mt-4">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setPage(1);
          }}
          className="rounded"
          type="search"
          placeholder="Search service..."
        />
      </div>

      <>
        <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative overflow-x-auto">
          {/* table */}
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[12px] sm:text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[60%] text-start">Title</th>
                <th className="w-[20%] text-start">Category</th>
                <th className="w-[10%] text-start">Price</th>
                <th className="w-[5%] text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {services?.data?.map((d, i) => (
                <tr
                  key={i}
                  className="border-b border-[#ebebeb] min-h-[40px] w-full sm:text-[16px]"
                >
                  <td className="pl-4 py-2 text-[12px]">
                    {i + 1 + (page - 1) * resultPerPage}
                  </td>
                  <td className="capitalize text-[12px]">
                    {d?.service_name?.length > 40
                      ? d?.service_name.slice(0, 40) + "..."
                      : d?.service_name}
                  </td>
                  <td className="capitalize text-[12px]">
                    {d?.category?.length > 40
                      ? d?.category.slice(0, 40) + "..."
                      : d?.category}
                  </td>
                  <td className="capitalize text-[12px]">
                    <CurrencyFormatter value={d?.price} />
                  </td>

                  <td>
                    <DeleteService id={d?.service_id} isLoading={isLoading} />
                  </td>
                </tr>
              ))}
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
              disabled={services?.data_found <= 10}
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
              disabled={services?.pagination?.previousPage == null || isLoading}
              className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                services?.pagination?.previousPage != null
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
                  length: services?.pagination?.totalPages,
                }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={services?.pagination?.nextPage == null || isLoading}
              className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                services?.pagination?.nextPage != null
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

export default Services;
