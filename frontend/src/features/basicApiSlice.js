import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/v1";

export const basicApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (Headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        Headers.set("authorization", `Bearer ${token}`);
      }
      Headers.set("Content-Type", "application/json");
      return Headers;
    },
  }),
  endpoints: () => ({}),
});
