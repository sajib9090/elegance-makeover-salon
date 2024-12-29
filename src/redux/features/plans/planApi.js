import { baseApi } from "../api/baseApi.js";

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => ({
        url: "/plans",
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),
    getSinglePlan: builder.query({
      query: (id) => ({
        url: `/plans/plan/${id}`,
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),
    selectPlan: builder.mutation({
      query: (data) => ({
        url: `/plans/select-plan/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [
        "Plans",
        "User",
        "Temp-Customer",
        "TempOrderLog",
        "Payment",
      ],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetSinglePlanQuery,
  useSelectPlanMutation,
} = planApi;
