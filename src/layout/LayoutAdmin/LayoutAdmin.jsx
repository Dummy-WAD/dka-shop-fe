// import NavbarAdmin from "./NavbarAdmin";
// import Sidebar from "./Sidebar";
import { node } from "prop-types";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import { useSelector } from "react-redux";
import NotPermitted from "../../pages/Error/NotPermitted";

const LayoutAdmin = ({ children }) => {
  const isAdminRoute = window.location.pathname.startsWith(
    `${import.meta.env.VITE_BASE_URL}/admin`
  );
  const role = useSelector((state) => state.auth.userInfo?.role);

  return (
    <>
      {isAdminRoute && role === "ADMIN" && (
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <SidebarAdmin />
            <div className="col p-0">
              <NavbarAdmin />
              <div className="px-4 py-5">{children}</div>
            </div>
          </div>
        </div>
      )}
      {isAdminRoute && role === "CUSTOMER" && <NotPermitted />}
    </>
  );
};

LayoutAdmin.propTypes = {
  children: node,
};

export default LayoutAdmin;
