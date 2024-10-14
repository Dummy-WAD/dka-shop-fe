import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  CartIcon,
  NotificationIcon,
  SearchIcon,
  UserIcon,
} from "../../../icon/Icon";
import searchSlice from "../../../redux/slice/searchSlice";
import css from "./NavbarUser.module.css";
import classNames from "classnames";
import { handleLogout } from "../../../api/user";
import authSlice from "../../../redux/slice/authSlice";
import { toast } from "react-toastify";

const NavbarUser = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState();
  const [isShowUserMenu, setShowUserMenu] = useState(false);
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
    <div className={css.container}>
      <header className={css.navbar}>
        <Link to="/">
          <img alt="logo" src="/logo.png" className={css.logo} />
        </Link>
        <div className={css.searchBar}>
          <input
            className={css.searchInput}
            value={searchText}
            placeholder="Explore our products..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchIcon
            className={css.searchIcon}
            onClick={() =>
              dispatch(searchSlice.actions.setSearchText(searchText))
            }
          />
        </div>
        <div className={css.actionBox}>
          {isAuthenticated ? (
            <>
              <div className={css.actionItem}>
                <div className={css.actionIcon}>
                  <NotificationIcon className={css.actionIconDetail} />
                  <span className={css.count}></span>
                </div>
                <div>Notification</div>
              </div>
              <div
                onClick={() => setShowUserMenu(!isShowUserMenu)}
                className={classNames(css.actionItem, css.actionUser)}
              >
                <UserIcon />
                <div>Account</div>
                {isShowUserMenu && (
                  <div className={css.menu}>
                    <Link className={css.menuLink} to="/">
                      Update Profile
                    </Link>
                    <Link className={css.menuLink} to="/">
                      Change Password
                    </Link>
                    <Link
                      onClick={handleClickToLogout}
                      className={css.menuLink}
                    >
                      Log out
                    </Link>
                  </div>
                )}
              </div>
              <div className={css.actionItem}>
                <div className={css.actionIcon}>
                  <CartIcon className={css.actionIconDetail} />
                  <span className={css.count}></span>
                </div>
                <div>Cart</div>
              </div>
            </>
          ) : (
            <>
              <Link className={classNames(css.button, css.primary)} to="/login">
                Login
              </Link>
              <Link
                className={classNames(css.button, css.secondary)}
                to="/signup"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavbarUser;
