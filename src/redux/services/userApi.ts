import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080"}),
    //import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    signup: builder.mutation<
      User,
      {username: string; password: string }
    >({
      query: (body) => {
        return {
          url: '/api/register',
          method: 'POST',
          body
        };
      }
    }),
    signIn: builder.mutation<User, { username: string; password: string }>({
      query: (body) => {
        return {
          url: '/api/login',
          method: 'POST',
          body
        };
      }
    }),
    update: builder.mutation<
      User,
      {
        userId: string;
        username: string;
        password: string;
        token: string;
      }
    >({
      query: (body) => {
        return {
          url: '/api/user/profile',
          headers: {
            Authorization: `Bearer ${body.token}`
          },
          method: 'PUT',
          body
        };
      }
    })
  })
});

export const { useSignupMutation, useSignInMutation, useUpdateMutation } =
  userApi;
