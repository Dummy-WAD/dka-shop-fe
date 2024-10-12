import css from "./SidebarAdmin.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className={classNames(css.sidebar)}>
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin" className={css.sidebarLink}>
            Product
          </Link>
        </li>
        <li>
          <Link to="/admin" className={css.sidebarLink}>
            Category
          </Link>
        </li>
        <li>
          <Link to="/admin" className={css.sidebarLink}>
            Order
          </Link>
        </li>
        <li>
          <Link to="/admin" className={css.sidebarLink}>
            Customer
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
