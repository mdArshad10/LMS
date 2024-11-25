import { basicApi } from "../basicApiSlice";

const purchaseApiSlice = basicApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSessions: builder.mutation({
      query: (data) => ({
        url: "/course-purchase/checkout/create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
    getAllPurchasesCourse: builder.query({
      query: () => ({
        url: "/course-purchase",
        method: "GET",
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course-purchase/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionsMutation,
  useGetAllPurchasesCourseQuery,
  useGetCourseDetailWithStatusQuery,
} = purchaseApiSlice;
