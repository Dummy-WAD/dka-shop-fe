import { useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";
import NotPermitted from "../../pages/Error/NotPermitted";

const LayoutUser = ({ children }) => {
  const isUserRoute = window.location.pathname.startsWith(
    `${import.meta.env.VITE_BASE_URL}`
  );
  const role = useSelector((state) => state.auth.userInfo?.role);
  return (
    <>
      {isUserRoute && role === "ADMIN" && <NotPermitted />}
      {isUserRoute && role === "CUSTOMER" && (
        <div className="container-fluid">
          <div className="row">
            <NavbarUser />
            <div
              className="px-5 py-4"
              style={{ backgroundColor: "#F3F4F6", minHeight: "50vh" }}
            >
              {children}
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutUser;
