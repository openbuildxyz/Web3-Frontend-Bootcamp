import { createBrowserRouter } from "react-router-dom";
import NotFound from "~/pages/404";
import Index from "~/pages/Index/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
