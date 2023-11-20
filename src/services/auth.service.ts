// Need to use the React-specific entry point to import createApi
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
  User,
} from "@/types/auth.types";
import { FetchBaseQueryError } from "@/types/global.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User | undefined, void>({
      queryFn: async (_, __, ___, baseQuery) => {
        try {
          const accessToken = localStorage.getItem("accessToken");

          const res = await baseQuery({
            url: "/current-user",
            method: "get",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if ("error" in res) {
            localStorage.removeItem("accessToken");

            return { error: res.error };
          }

          const data = res.data as User;

          return { data };
        } catch (e) {
          const err = e as FetchBaseQueryError;

          localStorage.removeItem("accessToken");

          return { error: err };
        }
      },
    }),

    register: builder.mutation<RegisterResponseDto, RegisterDto>({
      query: (registerDto) => ({
        url: "/register",
        method: "post",
        body: registerDto,
      }),
    }),

    login: builder.mutation<LoginResponseDto | undefined, LoginDto>({
      queryFn: async (loginDto, _, __, baseQuery) => {
        try {
          const res = await baseQuery({
            url: "/login",
            method: "post",
            body: loginDto,
          });

          if ("error" in res) {
            return { error: res.error };
          }

          const data = res.data as LoginResponseDto;

          localStorage.setItem("accessToken", data.accessToken);

          return { data };
        } catch (e) {
          const err = e as FetchBaseQueryError;

          return { error: err };
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  authApi;
