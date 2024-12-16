import { Link, useParams } from "react-router-dom";
import { useState } from "react"; // Import useState
import { useGetEmployeeByIdQuery } from "../../../../redux/features/employee/employeeApi";
import FullPageLoader from "../../../../components/FullPageLoader/FullPageLoader";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeByIdQuery(id, { skip: !id });
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FullPageLoader />
      </div>
    );
  }

  const employee = data?.data;
  const advanceSalaries = employee?.advanceSalaries || [];

  // Helper to filter current month's salaries
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthSalaries = advanceSalaries?.filter((advance) => {
    const advanceDate = new Date(advance?.createdAt);
    return (
      advanceDate.getMonth() === currentMonth &&
      advanceDate.getFullYear() === currentYear
    );
  });

  // Determine which salaries to show
  const salariesToShow = showAll ? advanceSalaries : currentMonthSalaries;

  // Calculate total for displayed salaries
  const totalAdvanceSalary = salariesToShow.reduce(
    (sum, advance) => sum + (advance?.advance_salary || 0),
    0
  );

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link to={"/dashboard"} className="text-gray-400">
            Dashboard {">"}{" "}
          </Link>
          <Link className="text-gray-400" to={"/dashboard/employees"}>
            Employees {">"}{" "}
          </Link>
          <Link to={`/dashboard/employees/${employee?.employee_id}`}>
            {employee?.name}{" "}
          </Link>
        </div>
        <p className="text-[14px] capitalize mb-6">Details of Employees</p>
      </div>

      {/* Header Section */}
      <div className="bg-pink-50 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-pink-800 capitalize">
          {employee?.name}
        </h1>
        <p className="text-gray-700 mt-2">
          <span className="font-medium">Employee ID:</span> {id}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Designation:</span>{" "}
          {employee?.designation}
        </p>
      </div>

      {/* Employee Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Employee Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Mobile:</span> {employee?.mobile}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Monthly Salary:</span>{" "}
              {employee?.monthly_salary?.toLocaleString()} BDT
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Joined On:</span>{" "}
              {new Date(employee?.createdAt)?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Advance Salaries Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Advance Salaries
        </h2>

        {/* Toggle Buttons */}
        <div className="mb-4">
          <button
            className={`py-2 px-4 rounded ${
              !showAll ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"
            } mr-2`}
            onClick={() => setShowAll(false)}
          >
            Current Month
          </button>
          <button
            className={`py-2 px-4 rounded ${
              showAll ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setShowAll(true)}
          >
            All Salaries
          </button>
        </div>

        {salariesToShow?.length > 0 ? (
          <div>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
                    <th className="py-4 px-6 text-left">#</th>
                    <th className="py-4 px-6 text-left">Amount (BDT)</th>
                    <th className="py-4 px-6 text-left">Created By</th>
                    <th className="py-4 px-6 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salariesToShow.map((advance, index) => (
                    <tr
                      key={advance?._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-pink-50`}
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">
                        {advance?.advance_salary?.toLocaleString()} BDT
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {advance?.createdBy}
                      </td>
                      <td className="py-4 px-6">
                        {new Date(advance?.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-start mt-4 text-gray-700 font-semibold">
              Total Advance Salaries:{" "}
              <span className="text-pink-600">
                {totalAdvanceSalary?.toLocaleString()} BDT
              </span>
            </div>
          </div>
        ) : (
          <div className="text-gray-600 bg-white p-4 rounded-lg shadow-md">
            No advance salaries found for this employee.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
