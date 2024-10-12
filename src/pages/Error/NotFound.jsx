import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  return (
    <>
      <div className="main-container-notfound">
        <h1>404 Error Page</h1>
        <p className="zoom-area">
          Sorry, you are not authorized to access this page.{" "}
        </p>
        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="link-container">
          <Link to="/" className="more-link">
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFound;
