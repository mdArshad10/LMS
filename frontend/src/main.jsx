import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
