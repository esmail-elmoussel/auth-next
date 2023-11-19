// Need to use the React-specific entry point to import createApi
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
} from "@/types/auth.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/auth" }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseDto, RegisterDto>({
      query: (registerDto) => ({
        url: "/register",
        method: "post",
        body: registerDto,
      }),
    }),
    login: builder.mutation<LoginResponseDto, LoginDto>({
      query: (loginDto) => ({
        url: "/login",
        method: "post",
        body: loginDto,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation } = authApi;
