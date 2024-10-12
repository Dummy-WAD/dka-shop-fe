import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";

const LayoutUser = () => {
  return (
    <div>
      <NavbarUser />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUser;
