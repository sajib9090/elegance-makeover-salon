import { baseApi } from "../api/baseApi.js";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => ({
        url: "/payments",
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    increaseSubscription: builder.mutation({
      query: (data) => ({
        url: `/payments/increase-subscription/${data?.transactionId}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Payment"],
    }),
    rejectSubscription: builder.mutation({
        query: (data) => ({
          url: `/payments/reject-payment`,
          method: "PATCH",
          body: data,
        }),
  
        invalidatesTags: ["Payment"],
      }),
  }),
});

export const { useGetPaymentsQuery, useIncreaseSubscriptionMutation,useRejectSubscriptionMutation } =
  paymentApi;
