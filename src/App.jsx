import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { handleGetUserInfo } from "./api/user";
import { useDispatch } from "react-redux";
import authSlice from "./redux/slice/authSlice";
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
