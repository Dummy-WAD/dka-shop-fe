import css from "./NavbarAdmin.module.css";
import { NotificationIcon } from "../../../icon/Icon";
import classNames from "classnames";
import LogoutIcon from "@mui/icons-material/Logout";
import { handleLogout } from "../../../api/user";
import authSlice from "../../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NotificationDropdown from "../../../components/NotificationDropdown/NotificationDropdown";
const NavbarAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const { totalNotificationItems } = useSelector((state) => state.notification);
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpenNotification((prev) => !prev);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickToLogout = () => {
    const logout = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        await handleLogout(refreshToken);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(
          authSlice.actions.setAuthInfo({
            isAuthenticated: false,
            userInfo: {},
          })
        );
        navigate("/login");
      } catch (err) {
        console.error(err);
        toast.error(err.response.data.message, {
          autoClose: 3000,
        });
      }
    };
    logout();
  };
  return (
    <nav className={classNames(css.navbar)}>
      <div className={classNames(css.logo)}>
        <img alt="logo" src="/logo.png" />
      </div>
      <div className={classNames(css.userMenu)}>
        <Link
          to="/"
          style={{ textDecoration: "underline", color: "var(--admin-color)" }}
        >
          User page
        </Link>
        <div className={css.iconNotification} onClick={handleNotificationClick}>
          <NotificationIcon className={css.notification} />
          {totalNotificationItems > 0 && (
            <span className={css.countItemCart}>{totalNotificationItems}</span>
          )}
        </div>

        <NotificationDropdown
          isOpen={isOpenNotification}
          anchorEl={anchorEl}
          setIsOpen={setIsOpenNotification}
        />
        <div onClick={handleClickToLogout} style={{ cursor: "pointer" }}>
          <LogoutIcon />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
