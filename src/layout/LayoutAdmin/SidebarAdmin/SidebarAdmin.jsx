import css from "./SidebarAdmin.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
          <Link
            to="/admin/category"
            className={css.sidebarLink}
            onClick={handleResetCategoryState}
          >
            Category
          </Link>
        </li>
        <li>
          <Link to="/admin/product" className={css.sidebarLink}>
            Product
          </Link>
        </li>
        <li>
          <Link to="/admin/order" className={css.sidebarLink}>
            Order
          </Link>
        </li>
        <li>
          <Link to="/admin/customer" className={css.sidebarLink}>
            Customer
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
