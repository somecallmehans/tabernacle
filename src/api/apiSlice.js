import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getRoutes from "./getRoues";
import postRoutes from "./postRoutes";
import authRoutes from "./authRoutes";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  tagTypes: ["Sessions", "Pods"],
  endpoints: (builder) => ({
    ...getRoutes(builder),
    ...postRoutes(builder),
    ...authRoutes(builder),
  }),
});

export const {
  useGetAchievementsQuery,
  useGetAllSessionsQuery,
  useGetParticipantsQuery,
  useGetPodsQuery,
  useGetAllColorsQuery,
  usePostCreateSessionMutation,
  usePostBeginRoundMutation,
  usePostCloseRoundMutation,
  usePostRoundScoresMutation,
  usePostUpsertParticipantMutation,
  useLoginMutation,
  useRefreshMutation,
} = apiSlice;
