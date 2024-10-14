import { createBrowserRouter, useNavigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin";
import LayoutUser from "../layout/LayoutUser/LayoutUser";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import SignUp from "../pages/SignUp/SignUp";
import ShowCategory from "../pages/Category/ShowCategory";
import { useSelector } from "react-redux";
import { ADMIN, CUSTOMER } from "../config/roles";
import { useEffect, useState } from "react";

const ProtectedRouteAuth = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.userInfo.role);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      switch (role) {
        case ADMIN:
          navigate("/admin");
          break;
        case CUSTOMER:
          navigate("/");
          break;
      }
    } else {
      setIsChecking(false);
    }
  }, [role]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
};

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
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <ShowCategory />,
        },
        {
          path: "category",
          element: <ShowCategory />,
        },
      ],
    },
    {
      path: "login",
      element: (
        <ProtectedRouteAuth>
          <Login />
        </ProtectedRouteAuth>
      ),
    },
    {
      path: "signup",
      element: (
        <ProtectedRouteAuth>
          <SignUp />
        </ProtectedRouteAuth>
      ),
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_URL,
  }
);

export default router;
