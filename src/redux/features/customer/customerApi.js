import { baseApi } from "../api/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: ({ searchValue, limitValue, pageValue }) => {
        const params = new URLSearchParams();
        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);

        const url = `/customers${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query({
      query: (customerId) => ({
        url: `/customers/customer-info/${customerId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Customer", id }],
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerByIdQuery } = customerApi;
