import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getRoutes from "./getRoutes";
import postRoutes from "./postRoutes";
import authRoutes from "./authRoutes";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  tagTypes: ["Sessions", "Pods", "Participants", "Achievements", "Earned"],
  endpoints: (builder) => ({
    ...getRoutes(builder),
    ...postRoutes(builder),
    ...authRoutes(builder),
  }),
});

export const {
  // GETS
  useGetAchievementsQuery,
  useGetAllSessionsQuery,
  useGetParticipantsQuery,
  useGetPodsQuery,
  useGetAllColorsQuery,
  useGetAchievementsForSessionQuery,
  useGetSessionByDateQuery,
  useGetAchievementsForMonthQuery,
  useGetUniqueMonthsQuery,

  // POSTS
  usePostCreateSessionMutation,
  usePostBeginRoundMutation,
  usePostCloseRoundMutation,
  usePostRoundScoresMutation,
  usePostUpsertParticipantMutation,
  usePostUpsertAchievementsMutation,
  usePostUpsertEarnedMutation,

  // AUTH
  useLoginMutation,
  useRefreshMutation,
} = apiSlice;
