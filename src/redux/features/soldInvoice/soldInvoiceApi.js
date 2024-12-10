import { baseApi } from "../api/baseApi";

const soldInvoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewInvoice: builder.mutation({
      query: (data) => ({
        url: "/sold-invoices/sold-invoice-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sold-Invoice", "Temp-Customer", "TempOrderLog"],
    }),
    getAllSoldInvoicesByDate: builder.query({
      query: ({ date, month, startDate, endDate }) => {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (month) params.append("month", month);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const url = `/sold-invoices${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Sold-Invoice"],
    }),
    // deleteTempOrder: builder.mutation({
    //   query: (data) => ({
    //     url: `/temp-orders-logs/temp-order-delete/${data?.tempId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["TempOrderLog"],
    // }),
    getSingleInvoiceById: builder.query({
      query: (id) => ({
        url: `/sold-invoices/sold-invoice/${id}`,
        method: "GET",
      }),
      providesTags: ["Sold-Invoice"],
    }),
  }),
});

export const {
  useCreateNewInvoiceMutation,
  useGetSingleInvoiceByIdQuery,
  useGetAllSoldInvoicesByDateQuery,
} = soldInvoiceApi;
