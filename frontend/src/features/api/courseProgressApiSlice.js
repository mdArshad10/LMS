import { basicApi } from "../basicApiSlice.js";

const courseProgressApiSlice = basicApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/course-progress/${courseId}`,
        method: "GET",
      }),
    }),

    updateLectureProgress: builder.mutation({
      query: (data) => ({
        url: `/course-progress/${data.courseId}/lectures/${data.lectureId}/view`,
        method: "POST",
      }),
    }),
    markCourseCompleted: builder.mutation({
      query: (courseId) => ({
        url: `/course-progress/${courseId}/complete`,
        method: "POST",
      }),
    }),
    markCourseInComplete: builder.mutation({
      query: (courseId) => ({
        url: `/course-progress/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useMarkCourseCompletedMutation,
  useGetCourseProgressQuery,
  useMarkCourseInCompleteMutation,
  useUpdateLectureProgressMutation
} = courseProgressApiSlice;
