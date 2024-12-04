import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLogout } from "../api/user";

export const getUniqueFileName = (file, id) => {
  const extension = file.name.split(".").pop();
  const fileName = file.name.replace(`.${extension}`, "");
  return `${fileName}_${id}.${extension}`;
};

export const formatPrice = (price) => {
  return `$ ${Number(price).toFixed(2)}`;
}

export const logout = async () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    await handleLogout(refreshToken);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // dispatch(
    //   authSlice.actions.setAuthInfo({
    //     isAuthenticated: false,
    //     userInfo: {},
    //   })
    // );
    // navigate("/login");
  } catch (err) {
    console.error(err);
    toast.error(err.response.data.message, {
      autoClose: 3000,
    });
  }
};