import { createBrowserRouter } from "react-router-dom";
import CreateCategory from "../pages/CreateCategory/CreateCategory";
import Home from "../pages/Home/Home";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin";
import LayoutUser from "../layout/LayoutUser/LayoutUser";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import SignUp from "../pages/SignUp/SignUp";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LayoutUser />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
          {
              path: "signup",
              element: <SignUp />
          }
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <CreateCategory />,
        },
        {
          path: "category/create",
          element: <CreateCategory />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_URL,
  }
);

export default router;
