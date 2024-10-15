import css from "./NavbarAdmin.module.css";
import { NotificationIcon } from "../../../icon/Icon";
import classNames from "classnames";
import LogoutIcon from "@mui/icons-material/Logout";
const NavbarAdmin = () => {
  return (
    <nav className={classNames(css.navbar)}>
      <div className={classNames(css.logo)}>
        <img alt="logo" src="/logo.png" />
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
