import { Link } from "react-router-dom";
import AddNewEmployees from "../../../components/Employees/AddNewEmployees/AddNewEmployees";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import { useState } from "react";
import { useGetAllEmployeesQuery } from "../../../redux/features/employee/employeeApi";
import DeleteEmployee from "../../../components/Employees/DeleteEmployee/DeleteEmployee";
import AddSalary from "../../../components/Employees/AddSalary/AddSalary";
import { isSameMonth } from "date-fns";

const Employees = () => {
  const [resultPerPage, setResultPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data: employees, isLoading } = useGetAllEmployeesQuery({
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
          <Link to={"/dashboard/employees"}>
            Employees ({employees?.data_found})
          </Link>
        </div>
        <p className="text-[14px] capitalize">list of Employees</p>
      </div>
      <AddNewEmployees />

      <div className="search mt-4">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setPage(1);
          }}
          className="rounded"
          type="search"
          placeholder="Search employees..."
        />
      </div>

      <>
        <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative overflow-x-auto">
          {/* table */}
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[12px] sm:text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[40%] text-start">Name</th>
                <th className="w-[20%] text-start"></th>
                <th className="w-[10%] text-start">Salary</th>
                <th className="w-[10%] text-start">Advance</th>
                <th className="w-[10%] text-start">Net Salary</th>
                <th className="w-[5%] text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees?.data?.map((d, i) => (
                <tr
                  key={i}
                  className="border-b border-[#ebebeb] min-h-[40px] w-full sm:text-[16px] hover:bg-blue-100 cursor-pointer"
                >
                  <td className="pl-4 py-2 text-[12px]">
                    {i + 1 + (page - 1) * resultPerPage}
                  </td>
                  <td className="capitalize text-[12px]">
                    <Link to={d?.employee_id}>
                      {d?.name?.length > 40
                        ? d?.name.slice(0, 40) + "..."
                        : d?.name}
                    </Link>
                  </td>
                  <td className="capitalize text-[12px]">
                    <p className="text-blue-600">{d?.designation}</p>
                    <p>{d?.mobile}</p>
                  </td>
                  <td className="capitalize text-[12px]">
                    <CurrencyFormatter value={d?.monthly_salary} />
                  </td>
                  <td className="capitalize text-[12px] text-red-600">
                    <CurrencyFormatter
                      value={d?.advanceSalaries
                        ?.filter((salary) =>
                          isSameMonth(new Date(salary?.createdAt), new Date())
                        )
                        .reduce(
                          (sum, salary) => sum + salary?.advance_salary,
                          0
                        )}
                    />
                  </td>
                  <td
                    className={`capitalize text-[12px] ${
                      d?.advanceSalaries
                        ?.filter((salary) =>
                          isSameMonth(new Date(salary?.createdAt), new Date())
                        )
                        .reduce(
                          (sum, salary) => sum + salary?.advance_salary,
                          0
                        ) < d?.monthly_salary
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <CurrencyFormatter
                      value={
                        d?.monthly_salary -
                        d?.advanceSalaries
                          ?.filter((salary) =>
                            isSameMonth(new Date(salary?.createdAt), new Date())
                          )
                          .reduce(
                            (sum, salary) => sum + salary?.advance_salary,
                            0
                          )
                      }
                    />
                  </td>

                  <td className="py-2 flex items-center justify-center flex-col space-y-2">
                    <AddSalary employeeId={d?.employee_id} />
                    <DeleteEmployee id={d?.employee_id} isLoading={isLoading} />
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
              disabled={employees?.data_found <= 10}
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
                employees?.pagination?.previousPage == null || isLoading
              }
              className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                employees?.pagination?.previousPage != null
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
                  length: employees?.pagination?.totalPages,
                }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={employees?.pagination?.nextPage == null || isLoading}
              className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                employees?.pagination?.nextPage != null
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

export default Employees;
