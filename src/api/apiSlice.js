import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  tagTypes: ["Sessions"],
  endpoints: (builder) => ({
    getAchievements: builder.query({
      query: () => "achievements_restrictions/",
    }),
    getAllSessions: builder.query({
      query: () => "all_sessions/",
      providesTags: ["Sessions"],
    }),
    getParticipants: builder.query({
      query: () => "participants/",
    }),
    postCreateSession: builder.mutation({
      query: () => ({
        url: "sessions/",
        method: "POST",
      }),
      invalidatesTags: ["Sessions"],
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
  useGetParticipantsQuery,
  usePostCreateSessionMutation,
  useLoginMutation,
  useRefreshMutation,
} = apiSlice;
