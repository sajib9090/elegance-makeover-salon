import { baseApi } from "../api/baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewExpense: builder.mutation({
      query: (data) => ({
        url: "/expenses/add-expense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),
    getAllExpensesByDate: builder.query({
      query: ({ date, month, startDate, endDate }) => {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (month) params.append("month", month);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const url = `/expenses${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Expense"],
    }),
    removeExpense: builder.mutation({
      query: (data) => ({
        url: `/expenses/delete-expense/${data?.expenseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useAddNewExpenseMutation,
  useGetAllExpensesByDateQuery,
  useRemoveExpenseMutation,
} = expenseApi;
