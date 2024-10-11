import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";

const LayoutUser = ({ children }) => {
  return (
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
  );
};

export default LayoutUser;
