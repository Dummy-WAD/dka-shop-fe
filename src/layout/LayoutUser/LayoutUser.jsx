import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";
import { useSelector } from "react-redux";
import NotPermitted from "../../pages/Error/NotPermitted";

const LayoutUser = () => {
  const isCustomerRoute = window.location.pathname.startsWith(
    `${import.meta.env.VITE_BASE_URL}`
  );
  const role = useSelector((state) => state?.auth?.userInfo?.role);

  if (isCustomerRoute && role === "ADMIN") return <NotPermitted />;
  return (
    <div>
      <NavbarUser />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUser;
