import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/category-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/delete/${data?.categoryId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useAddNewCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} = categoryApi;
