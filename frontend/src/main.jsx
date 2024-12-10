import "./index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { ThemeProvider } from "./components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </Provider>
);
