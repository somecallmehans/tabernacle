export default (builder) => ({
  getAchievements: builder.query({
    query: () => "achievements_restrictions/",
  }),
  getAllSessions: builder.query({
    query: () => "all_sessions/",
    providesTags: ["Sessions"],
  }),
  getAllColors: builder.query({
    query: () => "colors/",
  }),
  getParticipants: builder.query({
    query: () => "participants/",
  }),
  getPods: builder.query({
    query: (params) => `pods/${params}/`,
    providesTags: ["Pods"],
  }),
});
