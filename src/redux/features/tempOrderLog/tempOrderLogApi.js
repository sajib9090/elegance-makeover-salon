import { baseApi } from "../api/baseApi";

const tempOrderLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewTempOrderLog: builder.mutation({
      query: (data) => ({
        url: "/temp-orders-log/temp-order-log-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TempOrderLog"],
    }),
    getSingleTempOrderLog: builder.query({
      query: (data) => ({
        url: `/temp-orders-logs/temp-order/${data?.tempCustomerId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "TempOrderLog", id }],
    }),
    updateTempOrderQuantity: builder.mutation({
      query: (data) => ({
        url: `/temp-orders-logs/temp-order-quantity-change/${data?.tempOrderLogId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { temp_order_log_id }) => [
        { type: "TempOrderLog", id: temp_order_log_id },
      ],
    }),
    deleteTempOrder: builder.mutation({
      query: (data) => ({
        url: `/temp-orders-logs/temp-order-delete/${data?.tempId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TempOrderLog"],
    }),

    // getAllTempServices: builder.query({
    //   query: ({ searchValue }) => {
    //     const params = new URLSearchParams();
    //     if (searchValue) params.append("search", searchValue);

    //     const url = `/temp-customers${
    //       params.toString() ? `?${params.toString()}` : ""
    //     }`;

    //     return {
    //       url,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["Temp-Customer"],
    // }),
    // deleteService: builder.mutation({
    //   query: (data) => ({
    //     url: `/services/delete/${data?.serviceId}`,
    //     method: "DELETE",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Service"],
    // }),
  }),
});

export const {
  useAddNewTempOrderLogMutation,
  useGetSingleTempOrderLogQuery,
  useUpdateTempOrderQuantityMutation,
  useDeleteTempOrderMutation,
} = tempOrderLogApi;
