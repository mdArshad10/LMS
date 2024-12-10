import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducers, { userLoggedIn } from "../features/authSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { basicApi } from "../features/basicApiSlice.js";

const rootReducer = combineReducers({
  [basicApi.reducerPath]: basicApi.reducer,
  auth: authReducers,
});

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(basicApi.middleware),
});

const initializeApp = async () => {
  await store.dispatch(
    basicApi.endpoints.getProfile.initiate({}, { forceRefetch: true })
  );
};

initializeApp();

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
