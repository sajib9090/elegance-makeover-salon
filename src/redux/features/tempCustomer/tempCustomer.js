import { baseApi } from "../api/baseApi";

const tempCustomerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewTempCustomer: builder.mutation({
      query: (data) => ({
        url: "/temp-customers/temp-customer-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Temp-Customer", "Customer"],
    }),
    getAllTempServices: builder.query({
      query: ({ searchValue }) => {
        const params = new URLSearchParams();
        if (searchValue) params.append("search", searchValue);

        const url = `/temp-customers${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Temp-Customer"],
    }),
    deleteTempCustomer: builder.mutation({
      query: (data) => ({
        url: `/temp-customers/delete/${data?.tempId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Temp-Customer"],
    }),
    getTempCustomerById: builder.query({
      query: (id) => ({
        url: `/temp-customers/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["Temp-Customer"],
    }),
    updateTempCustomerMarkedAsPaid: builder.mutation({
      query: (id) => ({
        url: `/temp-customers/marked-as-paid/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Temp-Customer"],
    }),
  }),
});

export const {
  useAddNewTempCustomerMutation,
  useGetAllTempServicesQuery,
  useDeleteTempCustomerMutation,
  useGetTempCustomerByIdQuery,
  useUpdateTempCustomerMarkedAsPaidMutation,
} = tempCustomerApi;
