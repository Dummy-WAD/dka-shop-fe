import { node } from "prop-types";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NotPermitted from "../../pages/Error/NotPermitted";
import { ADMIN, CUSTOMER } from "../../config/roles";

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith(
    `${import.meta.env.VITE_BASE_URL}/admin`
  );
  const role = useSelector((state) => state?.auth?.userInfo?.role);
  return (
    <>
      {isAdminRoute && role === ADMIN && (
        <div style={{ display: "flex", height: "100vh" }}>
          <SidebarAdmin />

          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <NavbarAdmin />

            <div style={{ padding: "30px" }}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {isAdminRoute && role === CUSTOMER && <NotPermitted />}
    </>
  );
};

LayoutAdmin.propTypes = {
  children: node,
};

export default LayoutAdmin;
