import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CartIcon,
  NotificationIcon,
  SearchIcon,
  UserIcon,
} from "../../../icon/Icon";
import css from "./NavbarUser.module.css";
import classNames from "classnames";

const NavbarUser = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState();
  const [isShowUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className={css.container}>
      <header className={css.navbar}>
        <img alt="logo" src="/logo.png" className={css.logo} />
        <div className={css.searchBar}>
          <input
            className={css.searchInput}
            value={searchText}
            placeholder="Explore our products..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchIcon className={css.searchIcon} />
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
                    <Link className={css.menuLink}>Log out</Link>
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
