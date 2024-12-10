import { userLoggedIn, userLoggedOut } from "../authSlice";
import { basicApi } from "../basicApiSlice";

const authApiSlice = basicApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: "/users/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          console.log(response.data.data);

          dispatch(userLoggedIn({ user: response.data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProfile: build.mutation({
      query: (formData) => ({
        url: "/users",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
    getProfile: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(userLoggedIn(response.data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = authApiSlice;
