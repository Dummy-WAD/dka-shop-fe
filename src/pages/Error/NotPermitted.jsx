import { Link } from "react-router-dom";
import "./NotFound.css";
const NotPermitted = () => {
  return (
    <>
      <div className="main-container-notfound">
        <h1>403 Error Page</h1>
        <p className="zoom-area">
          Sorry, you are not authorized to access this page.{" "}
        </p>
        <div className="link-container">
          <Link to="/" className="more-link">
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotPermitted;
