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
        method: "PUT",
        body: data,
      }),
    }),
    markCourseCompleted: builder.query({
      query: (courseId) => ({
        url: `/course-progress/${courseId}/complete`,
        method: "PUT",
      }),
    }),
    markCourseInComplete: builder.query({
      query: (courseId) => ({
        url: `/courses-progress/${courseId}/incomplete`,
        method: "PUT",
      }),
    }),
  }),
});

const {} = courseProgressApiSlice;
