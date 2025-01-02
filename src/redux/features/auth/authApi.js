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
    editBrandInfo: builder.mutation({
      query: (data) => ({
        url: `/users/edit-brand-info/${data?.userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    editUserInfo: builder.mutation({
      query: (data) => ({
        url: `/users/edit-user-info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/users/forgot-password/${data?.mobile}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUserAvatar: builder.mutation({
      query: ({ avatar }) => {
        const formData = new FormData();
        formData.append("avatar", avatar);

        return {
          url: `/users/update-avatar`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateBrandLogo: builder.mutation({
      query: ({ brandLogo }) => {
        const formData = new FormData();
        formData.append("brandLogo", brandLogo);

        return {
          url: `/users/update-brand-logo`,
          method: "PATCH",
          body: formData,
        };
      },
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
  useEditBrandInfoMutation,
  useEditUserInfoMutation,
  useForgotPasswordMutation,
  useUpdateUserAvatarMutation,
  useUpdateBrandLogoMutation,
} = authApi;
