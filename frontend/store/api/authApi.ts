import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, ApiResponse } from '@/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Profile'],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<{ user: User; token: string }>, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Profile'],
    }),
    register: builder.mutation<ApiResponse<{ user: User; token: string }>, { 
      email: string; 
      password: string; 
      name: string;
      confirmPassword: string;
    }>({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User', 'Profile'],
    }),
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Profile'],
    }),
    refreshToken: builder.mutation<ApiResponse<{ token: string }>, void>({
      query: () => ({
        url: 'refresh',
        method: 'POST',
      }),
    }),
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => 'profile',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (updates) => ({
        url: 'profile',
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['Profile'],
    }),
    changePassword: builder.mutation<ApiResponse<void>, { 
      currentPassword: string; 
      newPassword: string;
      confirmPassword: string;
    }>({
      query: (passwords) => ({
        url: 'change-password',
        method: 'POST',
        body: passwords,
      }),
    }),
    forgotPassword: builder.mutation<ApiResponse<void>, { email: string }>({
      query: (data) => ({
        url: 'forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<void>, { 
      token: string; 
      password: string;
      confirmPassword: string;
    }>({
      query: (data) => ({
        url: 'reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<ApiResponse<void>, { token: string }>({
      query: (data) => ({
        url: 'verify-email',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    resendVerification: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: 'resend-verification',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
} = authApi;