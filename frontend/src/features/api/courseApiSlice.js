import { basicApi } from "../basicApiSlice";

const courseApiSlice = basicApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        data,
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
    }),
    editCourse: build.query({
      query: (data) => ({
        url: `/courses/${data.courseId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // ===== lecture Routes ======
    createLecture: build.mutation({
      query: (data) => ({
        url: `/courses/${data.courseId}/lectures`,
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
      query: (courseId, lectureId) => ({
        url: `/courses/${courseId}/lectures/${lectureId}`,
        method: "GET",
      }),
    }),

    editLecture: build.mutation({
      query: (data) => ({
        url: `/courses/${data.courseId}/lectures/${data.lectureId}`,
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
  useEditCourseQuery,
  useEditLectureMutation,
  useGetCourseAllLecturesQuery,
  useGetParticularLectureQuery,
} = courseApiSlice;

// seGetCourseLectureQuery;