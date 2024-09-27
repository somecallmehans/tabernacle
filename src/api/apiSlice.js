import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  endpoints: (builder) => ({
    getAchievements: builder.query({
      query: () => "achievements_restrictions/",
    }),
    getAllSessions: builder.query({
      query: () => "all_sessions/",
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/token/",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation({
      query: (token) => ({
        url: "api/token/refresh/",
        method: "POST",
        body: { refresh: token },
      }),
    }),
  }),
});

export const {
  useGetAchievementsQuery,
  useGetAllSessionsQuery,
  useLoginMutation,
  useRefreshMutation,
} = apiSlice;
