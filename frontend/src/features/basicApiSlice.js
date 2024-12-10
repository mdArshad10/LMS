import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

export const basicApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
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
