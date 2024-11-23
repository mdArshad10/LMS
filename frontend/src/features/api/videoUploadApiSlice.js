import { basicApi } from "../basicApiSlice.js";

const videoUploadApiSlice = basicApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadVideo: builder.mutation({
      query: (data) => ({
        url: "/media/upload-video",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadVideoMutation } = videoUploadApiSlice;
