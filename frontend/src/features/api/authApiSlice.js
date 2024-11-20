import { userLoggedIn } from "../authSlice";
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
          dispatch(userLoggedIn({ User: response.data.user }));
        } catch (error) {}
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "/users/login",
        method: "GET",
      }),
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/users",
        method: "PUT",
        body: data,
      }),
    }),
    getProfile: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
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
