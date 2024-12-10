import { basicApi } from "../basicApiSlice";

const courseApiSlice = basicApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
    }),
    getCreatorCourse: build.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),
    togglePublishCourse: build.mutation({
      query: (data) => ({
        url: `/courses/${data.courseId}?publish=${data.isPublished}`,
        method: "PUT",
        body: data,
      }),
    }),
    getCourseById: build.query({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "GET",
      }),
    }),
    getAllPublishedCourses: build.query({
      query: () => ({
        url: "/courses/published",
        method: "GET",
      }),
      transformErrorResponse: (response) => response.data.course,
    }),
    editCourse: build.mutation({
      query: ({ formData, courseId }) => ({
        url: `/courses/${courseId}`,
        method: "PUT",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
        credentials: "include",
      }),
    }),
    deleteCourses: build.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "DELETE",
      }),
    }),

    // ===== lecture Routes ======
    createLecture: build.mutation({
      query: ({ data, courseId }) => ({
        url: `/courses/${courseId}/lectures`,
        method: "POST",
        body: data,
      }),
    }),

    getCourseAllLectures: build.query({
      query: (courseId) => ({
        url: `/courses/${courseId}/lectures`,
        method: "GET",
      }),
    }),

    getParticularLecture: build.query({
      query: (lectureId) => ({
        url: `/courses/lectures/${lectureId}`,
        method: "GET",
      }),
    }),

    editLecture: build.mutation({
      query: ({ data, lectureId, courseId }) => ({
        url: `/courses/${courseId}/lectures/${lectureId}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteLecture: build.mutation({
      query: (data) => ({
        url: `/courses/lectures/${data.lectureId}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useTogglePublishCourseMutation,
  useGetCourseByIdQuery,
  useGetAllPublishedCoursesQuery,
  useEditCourseMutation,
  useCreateLectureMutation,
  useDeleteLectureMutation,
  useEditLectureMutation,
  useGetCourseAllLecturesQuery,
  useGetParticularLectureQuery,
  useDeleteCoursesMutation,
} = courseApiSlice;

// seGetCourseLectureQuery;
