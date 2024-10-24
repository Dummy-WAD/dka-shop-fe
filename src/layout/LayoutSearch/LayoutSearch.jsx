import { Outlet } from "react-router-dom";
import Footer from "../LayoutUser/Footer/Footer";
import NavbarUser from "../LayoutUser/NavbarUser/NavbarUser";

const LayoutSearch = () => {
  return (
    <div>
      <NavbarUser />
      <div>
        <div style={{ minWidth: "1200px", margin: "0 auto" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutSearch;
