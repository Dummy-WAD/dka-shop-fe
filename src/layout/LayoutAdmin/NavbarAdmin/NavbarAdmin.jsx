import css from "./NavbarAdmin.module.css";
import { NotificationIcon, SearchIcon } from "../../../icon/Icon";
import { useDispatch } from "react-redux";
import { useState } from "react";
import searchSlice from "../../../redux/slice/searchSlice";
import classNames from "classnames";
import LogoutIcon from "@mui/icons-material/Logout";
import { handleLogout } from "../../../api/user";
import authSlice from "../../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
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
        <Link to="/admin">
          <img alt="logo" src="/logo.png" />
        </Link>
      </div>
      <div className={classNames(css.searchBar)}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchIcon
          onClick={() =>
            dispatch(searchSlice.actions.setSearchText(searchText))
          }
          className={classNames(css.searchIcon)}
        />
      </div>
      <div className={classNames(css.userMenu)}>
        <NotificationIcon />
        <div onClick={handleClickToLogout} style={{ cursor: "pointer" }}>
          <LogoutIcon />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
