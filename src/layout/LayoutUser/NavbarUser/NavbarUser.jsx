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
import { logout } from "../../../helper";

const NavbarUser = () => {
  const refInput = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth.userInfo);
  const { totalCartItems } = useSelector((state) => state.cart);
  const { totalNotificationItems } = useSelector((state) => state.notification);
  const [isShowUserMenu, setShowUserMenu] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpenNotification((prev) => !prev);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickToLogout = async () => {
    await logout();
    dispatch(
      authSlice.actions.setAuthInfo({
        isAuthenticated: false,
        userInfo: {},
      })
    );
    navigate("/login");
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
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
              <div className={css.actionItem}>
                <div
                  className={css.actionIcon}
                  onClick={handleNotificationClick}
                >
                  <div className={css.iconBellContainer}>
                    <NotificationIcon className={css.actionIconDetail} />
                    {totalNotificationItems > 0 && (
                      <span className={css.countItemCart}>
                        {totalNotificationItems}
                      </span>
                    )}
                  </div>

                  <div>Notification</div>
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
