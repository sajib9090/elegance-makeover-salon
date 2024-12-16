import { baseApi } from "../api/baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: ({ searchValue, limitValue, pageValue }) => {
        const params = new URLSearchParams();
        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);

        const url = `/employees${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Employee"],
    }),
    getEmployeeById: builder.query({
      query: (employeeId) => ({
        url: `/employees/employee/${employeeId}`,
        method: "GET",
      }),
      providesTags: (result, error, employeeId) => [
        { type: "Employee", employee_id: employeeId },
      ],
    }),
    addNewEmployee: builder.mutation({
      query: (data) => ({
        url: "/employees/employee-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    addEmployeeAdvanceSalary: builder.mutation({
      query: (data) => ({
        url: `/employees/employee-advance-salary/${data?.employeeId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (data) => ({
        url: `/employees/delete/${data?.employeeId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useAddNewEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useDeleteEmployeeMutation,
  useAddEmployeeAdvanceSalaryMutation,
} = employeeApi;
