export default (builder) => ({
  getAchievements: builder.query({
    query: () => "achievements_restrictions/",
    providesTags: ["Achievements"],
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
    providesTags: ["Participants"],
  }),
  getPods: builder.query({
    query: (params) => `pods/${params}/`,
    providesTags: ["Pods"],
  }),
  getAchievementsForSession: builder.query({
    query: (params) => `earned_for_session/${params}/`,
    providesTags: ["Earned"],
  }),
});
