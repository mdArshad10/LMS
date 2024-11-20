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
  }),
});

export const { useCreateCourseMutation, useGetCreatorCourseQuery } =
  courseApiSlice;
