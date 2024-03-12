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
  TeamCount,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as allUsersLoader } from "./pages/AllUsers";
import { loader as editProfileLoader } from "./pages/EditProfile";
import { loader as profileLoader } from "./pages/Profile";
import { action as editProfileAction } from "./pages/EditProfile";
import { loader as teamCountLoader } from "./pages/TeamCount";

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
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
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
            path: "team-count",
            element: <TeamCount />,
            loader: teamCountLoader,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
            loader: editProfileLoader,
            action: editProfileAction,
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
