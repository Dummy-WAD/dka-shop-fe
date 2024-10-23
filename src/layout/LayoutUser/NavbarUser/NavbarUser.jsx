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
import { setInfoPageSearch, resetInfoPageSearch } from "../../../redux/slice/searchSlice";

const NavbarUser = () => {
  const refInput = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    refInput?.current?.addEventListener("keypress", handleKeyPress);
    return () => {
      refInput?.current?.removeEventListener("keypress", handleKeyPress);
      dispatch(resetInfoPageSearch());
    };
  }, []);

  const handleSearch = () => {
    dispatch(setInfoPageSearch({
      page: 1,
      searchText: refInput.current.value.trim()
    }))
    navigate("/search");
  }

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
