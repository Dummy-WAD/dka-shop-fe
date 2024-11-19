import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin";
import LayoutUser from "../layout/LayoutUser/LayoutUser";
import LayoutSearch from "../layout/LayoutSearch/LayoutSearch";
import LayoutHomePage from "../layout/LayoutHomePage/LayoutHomePage";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import SignUp from "../pages/SignUp/SignUp";
import ShowCategory from "../pages/Category/ShowCategory";
import { useSelector } from "react-redux";
import { ADMIN, CUSTOMER } from "../config/roles";
import { useEffect, useState } from "react";
import ProductAdmin from "../pages/ProductAdmin/ProductAdmin";
import ProductDetail from "../components/Product/ProductDetail";
import CustomerListAdmin from "../pages/CustomerListAdmin/CustomerListAdmin";
import NotPermitted from "../pages/Error/NotPermitted";
import CustomerDetail from "../components/Customer/CustomerDetail";
import Confirm from "../pages/ConfirmEmail/Confirm";
import ResendEmail from "../pages/ResendEmail/ResendEmail";
import ProductDetailCustomer from "../pages/ProductCustomer/ProductDetailCustomer";
import Search from "../pages/Search/Search";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/Profile/ChangePassword";
import EditProduct from "../pages/EditProduct/EditProduct";
import Address from "../pages/Address/Address";
import Cart from "../pages/Cart/Cart";
import OrderListCustomer from "../pages/OrdersListCustomer/OrderListCustomer";
import DetailOrderCustomer from "../pages/DetailOrderCustomer/DetailOrderCustomer";
import OrderAdmin from "../pages/OrderAdmin/OrderAdmin";
import DiscountAdmin from "../pages/DiscountListAdmin/DiscountAdmin";

import DetailOrderAdmin from "../pages/DetailOrderAdmin/DetailOrderAdmin";
import OrderStatistics from "../pages/Statistics/OrderStatistics";
import UserStatistics from "../pages/Statistics/UserStatistics";
import TopProductStatistics from "../pages/Statistics/TopProductStatistics";
import TopCategoryStatistics from "../pages/Statistics/TopCategoryStatistics";
import RevenueStatistics from "../pages/Statistics/RevenueStatistics";

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
          path: "product/:productId",
          element: <ProductDetailCustomer />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "address",
          element: <Address />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "orders/:id",
          element: <DetailOrderCustomer />,
        },
        {
          path: "purchase",
          element: <OrderListCustomer />,
        },
      ],
    },
    {
      path: "/",
      element: <LayoutHomePage />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/search",
      element: <LayoutSearch />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Search />,
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
          element: <Navigate to="statistics" replace />,
        },
        {
          path: "statistics",
          children: [
            {
              index: true,
              element: <Navigate to="order" replace />,
            },
            {
              path: "order",
              element: <OrderStatistics />,
            },
            {
              path: "user",
              element: <UserStatistics />,
            },
            {
              path: "revenue",
              element: <RevenueStatistics />,
            },
            {
              path: "top-products",
              element: <TopProductStatistics />,
            },
            {
              path: "top-categories",
              element: <TopCategoryStatistics />,
            },
          ],
        },
        {
          path: "category",
          element: <ShowCategory />,
        },
        {
          path: "product",
          element: <ProductAdmin />,
        },
        {
          path: "product/create",
          element: <CreateProduct />,
        },
        {
          path: "product/edit/:id",
          element: <EditProduct />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "order",
          element: <OrderAdmin />,
        },
        {
          path: "customer",
          element: <CustomerListAdmin />,
        },
        {
          path: "customer/:customerId",
          element: <CustomerDetail />,
        },
        {
          path: "order/:id",
          element: <DetailOrderAdmin />,
        },
        {
          path: "discount",
          element: <DiscountAdmin />,
        }
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
    {
      path: "confirm-signup",
      element: <Confirm />,
      errorElement: <Error />,
    },
    {
      path: "unauthorized",
      element: <NotPermitted />,
    },
    {
      path: "resend-email",
      element: <ResendEmail />,
      errorElement: <Error />,
    },
    {
      path: "error",
      element: <Error />,
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_URL,
  }
);

export default router;
