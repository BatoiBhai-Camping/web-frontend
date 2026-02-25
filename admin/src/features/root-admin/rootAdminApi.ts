import { baseApi } from "@/services/baseApi";
import type { SubAdminsResponse } from "@/types/userType";
import type { approveSubAdminType } from "@/types/rootAdminType";

const rootAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubAdmins: builder.query<SubAdminsResponse, void>({
      query: () => ({
        url: "/root-admin/get-all-sub-admin",
        method: "GET",
      }),
    }),
    approveSubAdmin: builder.mutation<approveSubAdminType, { id: string }>({
      query: (data: { id: string }) => ({
        url: "/root-admin/approve-sub-admin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetSubAdminsQuery, useApproveSubAdminMutation} = rootAdminApi;
