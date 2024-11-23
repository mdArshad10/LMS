import { basicApi } from "../basicApiSlice";

const purchaseApiSlice = basicApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSessions: builder.mutation({
      query: (data) => ({
        url: "/checkout/sessions",
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
    getPurchasesCourseDetail: builder.query({
      query: () => ({
        url: "/course-purchase/course/:courseId/detail-with-status",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionsMutation,
  useGetAllPurchasesCourseQuery,
  useGetPurchasesCourseDetailQuery,
} = purchaseApiSlice;
