import css from "./NavbarAdmin.module.css";
import { NotificationIcon, SearchIcon } from "../../../icon/Icon";
import { useDispatch } from "react-redux";
import { useState } from "react";
import searchSlice from "../../../redux/slice/searchSlice";
import classNames from "classnames";
import LogoutIcon from "@mui/icons-material/Logout";
const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  return (
    <nav className={classNames(css.navbar)}>
      <div className={classNames(css.logo)}>
        <img alt="logo" src="/logo.png" />
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
        <NotificationIcon className={css.notifIcon} />
        <div style={{ cursor: "pointer" }}>
          <LogoutIcon />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
