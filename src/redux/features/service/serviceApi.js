import { baseApi } from "../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewService: builder.mutation({
      query: (data) => ({
        url: "/services/service-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    getAllServices: builder.query({
      query: ({ searchValue, limitValue, pageValue, sortPrice, category }) => {
        const params = new URLSearchParams();
        if (searchValue) params.append("search", searchValue);
        if (limitValue) params.append("limit", limitValue);
        if (pageValue) params.append("page", pageValue);
        if (sortPrice) params.append("sortPrice", sortPrice);
        if (category) params.append("category", category);

        const url = `/services${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (data) => ({
        url: `/services/delete/${data?.serviceId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useAddNewServiceMutation,
  useGetAllServicesQuery,
  useDeleteServiceMutation,
} = serviceApi;
