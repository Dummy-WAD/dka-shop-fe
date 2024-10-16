import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";
import { useSelector } from "react-redux";
import NotPermitted from "../../pages/Error/NotPermitted";
import { ADMIN } from "../../config/roles";

const LayoutUser = () => {
  const isCustomerRoute = window.location.pathname.startsWith(
    `${import.meta.env.VITE_BASE_URL}`
  );
  const role = useSelector((state) => state?.auth?.userInfo?.role);

  if (isCustomerRoute && role === ADMIN) return <NotPermitted />;
  return (
    <div>
      <NavbarUser />
      <div style={{ padding: "30px 50px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutUser;
