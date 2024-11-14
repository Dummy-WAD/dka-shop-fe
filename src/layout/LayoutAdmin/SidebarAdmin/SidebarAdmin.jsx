import css from "./SidebarAdmin.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetCategoryState } from "../../../redux/slice/categorySlice";

const SidebarAdmin = () => {
  const dispatch = useDispatch();
  const handleResetCategoryState = () => {
    dispatch(resetCategoryState());
  };
  return (
    <div className={classNames(css.sidebar)}>
      <h2>Admin Panel</h2>
      <ul>
      <li>
          <NavLink
            to="/admin/statistics"
            className={({ isActive }) => (isActive ? css.active : css.nav_link)}
          >
            Statistics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/category"
            className={({ isActive }) => (isActive ? css.active : css.nav_link)}
            onClick={handleResetCategoryState}
          >
            Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/product"
            className={({ isActive }) => (isActive ? css.active : css.nav_link)}
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/order"
            className={({ isActive }) => (isActive ? css.active : css.nav_link)}
          >
            Order
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : css.nav_link)}
            to="/admin/customer"
          >
            Customer
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
