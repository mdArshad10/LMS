import { basicApi } from "../basicApiSlice";

const courseApiSlice = basicApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCreatorCourse: build.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
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
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    deleteCourses: build.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "DELETE",
      }),
    }),
    searchCourse: build.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        let queryString = `/courses/search?query=${encodeURIComponent(
          searchQuery
        )}`;

        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&category=${categoriesString}`;
        }

        // Append sortByPrice is available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
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
      providesTags: ["Refetch_Lecture"],
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
      invalidatesTags: ["Refetch_Lecture"],
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
  useSearchCourseQuery,
} = courseApiSlice;

// seGetCourseLectureQuery;
