import { baseApi } from "../api/baseApi.js";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/auth-user-login",
        method: "POST",
        body: credentials,
      }),
    }),
    addNewUser: builder.mutation({
      query: (data) => ({
        url: "/users/created-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/user/${id}`,
        method: "GET",
      }),
    }),
    changePasswordByAuthority: builder.mutation({
      query: (data) => ({
        url: `/users/password-change-by-authority/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUserByAuthority: builder.mutation({
      query: (id) => ({
        url: `/users/delete-user-by-authority/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useChangePasswordByAuthorityMutation,
  useDeleteUserByAuthorityMutation,
  useAddNewUserMutation,
} = authApi;
