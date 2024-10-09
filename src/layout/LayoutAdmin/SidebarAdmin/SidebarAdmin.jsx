import {
  CategoryIcon,
  ChartIcon,
  OrderIcon,
  ProductIcon,
  UserIcon,
} from "../../../icon/Icon";
import "./SidebarAdmin.css";

const SidebarAdmin = () => {
  return (
    <div
      id="sidebar"
      className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
    >
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 py-3 text-white min-vh-100">
        <a
          href="/admin/create-category"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Dashboard</span>
        </a>
        <ul
          className="row-gap-2 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
          id="menu"
        >
          <li className="sidebar-item nav-item w-100">
            <a
              href="#"
              className="nav-link align-middle text-white px-0 d-flex align-items-center column-gap-2"
            >
              <ProductIcon />
              <span className="ms-1 d-none d-sm-inline">Product</span>
            </a>
          </li>
          <li className="sidebar-item nav-item w-100">
            <a
              href="#"
              className="nav-link align-middle text-white px-0 d-flex align-items-center column-gap-2"
            >
              <CategoryIcon />
              <span className="ms-1 d-none d-sm-inline">Category</span>
            </a>
          </li>
          <li className="sidebar-item nav-item w-100">
            <a
              href="#"
              className="nav-link align-middle text-white px-0 d-flex align-items-center column-gap-2"
            >
              <OrderIcon />
              <span className="ms-1 d-none d-sm-inline">Order</span>
            </a>
          </li>
          <li className="sidebar-item nav-item w-100">
            <a
              href="#"
              className="nav-link align-middle text-white px-0 d-flex align-items-center column-gap-2"
            >
              <UserIcon />
              <span className="ms-1 d-none d-sm-inline">Customer</span>
            </a>
          </li>
          <li className="sidebar-item nav-item w-100">
            <a
              href="#"
              className="nav-link align-middle text-white px-0 d-flex align-items-center column-gap-2"
            >
              <ChartIcon />
              <span className="ms-1 d-none d-sm-inline">Statistics</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
