import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/ThemeProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster />
    </HelmetProvider>
  </Provider>
);
