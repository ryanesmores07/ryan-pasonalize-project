import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Error,
  HomeLayout,
  Landing,
  Register,
  Login,
  Profile,
  Dashboard,
  EditProfile,
  AllUsers,
  Stats,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as allUsersLoader } from "./pages/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AllUsers />,
            loader: allUsersLoader,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            index: true,
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
