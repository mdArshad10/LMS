import { basicApi } from "../basicApiSlice";

const courseApiSlice = basicApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: (data) => ({
        url: "/course/create",
        method: "POST",
        data,
      }),
    }),
    getCreatorCourse: build.query({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
    }),
    editCourse: build.mutation({
      query: (data) => ({
        url: `/course/${data.courseId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getCourseById: build.query({
      query: (courseId) => ({
        url: `/course/${courseId}`,
        method: "GET",
      }),
    }),

    createLecture: build.mutation({
      query: (data) => ({
        url: `/course/${data.courseId}/lecture`,
        method: "POST",
        body: data,
      }),
    }),

    getCourseLecture: build.query({
      query: (courseId) => ({
        url: `/course/${courseId}/lecture`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} = courseApiSlice;
