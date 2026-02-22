import { baseApi } from "../../services/baseApi";
import type{ userProfileapi } from "@/types/userType";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerRootAdmin: builder.mutation({
      query: (data) => ({
        url: "/root-admin/register",
        method: "POST",
        body: data,
      }),
    }),
    registerAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/register",
        method: "POST",
        body: data,
      }),
    }),
    loginRootAdmin: builder.mutation({
      query: (data) => ({
        url: "/root-admin/login",
        method: "POST",
        body:data
      })
    }),
    getAdminRootAdminProfile: builder.query<userProfileapi, void>({
      query:() => ({
        url: "/admin/get-profile",
        method: "GET",
        
      })
    }),
    verifyRootAdminEmail: builder.mutation({
      query: (data) => ({
        url: "/root-admin/verify-account",
        method: "POST",
        body:data
      })
    }),
    resendRootAdminEmailVerifyLink: builder.mutation({
      query: (data)=> ({
        url: "/root-admin/send-verification-link",
        method: "POST",

      })
    }),
    logout: builder.mutation<void,void>({
      query: (data) => ({
        url: "/root-admin/logout",
        method: "DELETE",
        body: data
      })
    })
  }),
});

export const { useRegisterRootAdminMutation, useRegisterAdminMutation, useGetAdminRootAdminProfileQuery, useLoginRootAdminMutation, useLogoutMutation, useVerifyRootAdminEmailMutation , useResendRootAdminEmailVerifyLinkMutation} = authApi;
