import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import ErrorElement from "./components/ErrorElement";

import { action as registerAction } from "./pages/Register";
import { loader as registerLoader } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as deleteAccountAction } from "./pages/DeleteAccunt";
import { loader as loginLoader } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as allUsersLoader } from "./pages/AllUsers";
import { loader as editProfileLoader } from "./pages/EditProfile";
import { loader as profileLoader } from "./pages/Profile";
import { action as editProfileAction } from "./pages/EditProfile";
import { loader as teamCountLoader } from "./pages/TeamCount";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        loader: registerLoader,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
        loader: loginLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader(queryClient),
      },
      {
        path: ":id",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "dashboard",
        element: <Dashboard queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AllUsers />,
            loader: allUsersLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "team-count",
            element: <TeamCount />,
            loader: teamCountLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
            loader: editProfileLoader,
            action: editProfileAction(queryClient),
          },
          {
            path: "delete-account",
            action: deleteAccountAction(queryClient),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
