// import NavbarAdmin from "./NavbarAdmin";
// import Sidebar from "./Sidebar";
import { node } from "prop-types";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SidebarAdmin />
        <div className="col p-0">
          <NavbarAdmin />
          <div className="px-4 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

LayoutAdmin.propTypes = {
  children: node,
};

export default LayoutAdmin;
