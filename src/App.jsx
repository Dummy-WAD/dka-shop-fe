import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { handleGetUserInfo } from "./api/user";
import { useDispatch } from "react-redux";
import authSlice from "./redux/slice/authSlice";
import { CUSTOMER } from "./config/roles";
import { getTotalCartItems } from "./api/cart";
import cartSlice from "./redux/slice/cartSlice";
import { getTotalNotifications } from "./api/notification";
import { setTotalNotificationItems } from "./redux/slice/notificationSlice";

function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await handleGetUserInfo();
        dispatch(
          authSlice.actions.setAuthInfo({
            isAuthenticated: true,
            userInfo: res,
          })
        );

        if (res?.role === CUSTOMER) {
          const cartsCount = await getTotalCartItems();
          dispatch(
            cartSlice.actions.setTotalCartItems(cartsCount.totalCartItems)
          );
        }
        const notificationCount = await getTotalNotifications(res?.role);
        if (notificationCount)
          dispatch(
            setTotalNotificationItems(notificationCount.notificationsCount)
          );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      getUserInfo();
    } else setLoading(false);
  }, [accessToken, dispatch]);

  if (isLoading) return null;

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
