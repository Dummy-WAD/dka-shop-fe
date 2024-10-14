import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { handleGetUserInfo } from "./api/user";
import { useDispatch } from "react-redux";
import authSlice from "./redux/slice/authSlice";
function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await handleGetUserInfo();
        console.log(res);
        dispatch(
          authSlice.actions.setAuthInfo({
            isAuthenticated: true,
            userInfo: res,
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
