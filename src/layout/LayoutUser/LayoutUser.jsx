import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";

const LayoutUser = () => {
  const location = useLocation();
  return (
    <div>
      <NavbarUser />
      <div style={{ background: location.pathname === '/' ? '#f3f4f6' : "none" }}>
        <div style={{ paddingBottom: "30px" }}>
          <div style={{ minWidth: '1200px', margin: "0 auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default LayoutUser;
