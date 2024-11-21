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
  }),
});

export const { useCreateCheckoutSessionsMutation } = purchaseApiSlice;
