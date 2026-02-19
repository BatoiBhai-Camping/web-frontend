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
    loginRootAdmin: builder.mutation({
      query: (data) => ({
        url: "/root-admin/login",
        method: "POST",
        body:data
      })
    }),
    getRootAdminProfile: builder.query<userProfileapi, void>({
      query:() => ({
        url: "/root-admin/get-profile",
        method: "GET",
        
      })
    }),
    
    logout: builder.mutation<void,void>({
      query: () => ({
        url: "/root-admin/logout",
        method: "DELETE"
      })
    })
  }),
});

export const { useRegisterRootAdminMutation, useGetRootAdminProfileQuery, useLoginRootAdminMutation, useLogoutMutation } = authApi;
