import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";

const LayoutUser = () => {
  const location = useLocation();
  return (
    <div>
      <NavbarUser />
      <div>
        <div style={{ padding: "30px 50px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default LayoutUser;
