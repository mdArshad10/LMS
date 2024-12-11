import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/app/data";

export const basicApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
    prepareHeaders: (Headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        Headers.set("authorization", `Bearer ${token}`);
      }
      return Headers;
    },
  }),
  endpoints: () => ({}),
});
