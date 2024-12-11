import { toast } from "sonner";
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

          dispatch(userLoggedIn({ user: response.data }));
        } catch (err) {

          toast.error(
            err.error?.data?.message || "Login failed. Please try again."
          );
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
        } catch (err) {
          toast.error(
            err.error?.data?.message || "logout failed. Please try again."
          );
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
        } catch (err) {
          console.log(err.error?.data?.message);
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
