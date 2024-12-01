import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { ProfilePage } from "./profile";
import { MintPage } from "./mint";
import { AppLayout } from "../components/AppLayout";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/mint",
        element: <MintPage />,
      },
    ],
  },
]);
