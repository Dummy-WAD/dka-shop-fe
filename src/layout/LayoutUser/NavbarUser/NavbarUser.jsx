import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  CartIcon,
  NotificationIcon,
  SearchIcon,
  UserIcon,
} from "../../../icon/Icon";
import SearchInput from "../../../components/SearchInput/SearchInput";
import css from "./NavbarUser.module.css";
import classNames from "classnames";
import { handleLogout } from "../../../api/user";
import authSlice from "../../../redux/slice/authSlice";
import { toast } from "react-toastify";
import {
  setInfoPageSearch,
  setSearchText,
} from "../../../redux/slice/searchSlice";
import { ADMIN, CUSTOMER } from "../../../config/roles";
import NotificationDropdown from "../../../components/NotificationDropdown/NotificationDropdown";

const NavbarUser = () => {
  const refInput = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth.userInfo);
  const { totalCartItems } = useSelector((state) => state.cart);
  const [isShowUserMenu, setShowUserMenu] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpenNotification((prev) => !prev); // Toggle dropdown visibility
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    refInput?.current?.addEventListener("keypress", handleKeyPress);
    return () => {
      refInput?.current?.removeEventListener("keypress", handleKeyPress);
      dispatch(setSearchText(""));
    };
  }, []);

  const handleSearch = () => {
    dispatch(
      setInfoPageSearch({
        page: 1,
        searchText: refInput.current.value.trim(),
      })
    );
    navigate("/search");
  };

  return (
    <div className={css.container}>
      <header className={css.navbar}>
        <Link to="/">
          <img alt="logo" src="/logo.png" className={css.logo} />
        </Link>
        <SearchInput
          placeholder="Explore our products..."
          inputRef={refInput}
          onSearch={handleSearch}
        />
        <div className={css.actionBox}>
          {isAuthenticated && role === CUSTOMER ? (
            <>
              <div
                onClick={() => setShowUserMenu(!isShowUserMenu)}
                className={classNames(css.actionItem, css.actionUser)}
              >
                <UserIcon />
                <div>Account</div>
                {isShowUserMenu && (
                  <div className={css.menu}>
                    <Link className={css.menuLink} to="/profile">
                      My Profile
                    </Link>
                    <Link className={css.menuLink} to="/change-password">
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
                <div
                  className={css.actionIcon}
                  onClick={handleNotificationClick}
                >
                  <NotificationIcon className={css.actionIconDetail} />
                  <span className={css.countItemCart}>12</span>
                </div>

                <NotificationDropdown
                  isOpen={isOpenNotification}
                  anchorEl={anchorEl}
                  setIsOpen={setIsOpenNotification}
                />
              </div>
              <Link to="/cart">
                <div className={css.actionItem}>
                  <div className={css.actionIcon}>
                    <CartIcon className={css.actionIconDetail} />
                    {totalCartItems > 0 && (
                      <span className={css.countItemCart}>
                        {totalCartItems}
                      </span>
                    )}
                  </div>
                  <div>Cart</div>
                </div>
              </Link>
            </>
          ) : isAuthenticated && role === ADMIN ? (
            <Link
              to="/admin"
              style={{
                color: "var(--admin-color)",
                textDecoration: "underline",
              }}
            >
              Back to admin page
            </Link>
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
