import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";

const LayoutUser = () => {
  return (
    <div>
      <NavbarUser />
      <div className="banner" style={{ width: "100%", height: "600px", overflow: "hidden"}}>
        <img
          src="../../../public/bannerr.png"
          alt="Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "30px 50px", backgroundColor: "#f3f4f6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default LayoutUser;
