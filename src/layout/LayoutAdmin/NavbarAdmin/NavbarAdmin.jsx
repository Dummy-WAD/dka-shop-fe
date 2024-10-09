import { Dropdown } from "react-bootstrap";
import "./NavbarAdmin.css";
import { NotificationIcon, SearchIcon } from "../../../icon/Icon";
import { useDispatch } from "react-redux";
import { useState } from "react";
import searchSlice from "../../../redux/slice/searchSlice";
const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  return (
    <nav
      id="navbar-admin"
      className="navbar navbar-expand-lg bg-body-tertiary px-3 py-1"
    >
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarSupportedContent"
        >
          <img alt="logo" src="/logo.png" className="logo" />
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="btn btn-dark"
              type="button"
              onClick={() =>
                dispatch(searchSlice.actions.setSearchText(searchText))
              }
            >
              Search
            </button>
          </form>
          <div className="d-flex align-items-center column-gap-3">
            <NotificationIcon width="1.5rem" height="1.5rem" />
            <div className="dropdown bg-transparent">
              <Dropdown className="bg-transparent ">
                <Dropdown.Toggle
                  as="button"
                  className="btn btn-secondary d-flex align-items-center bg-transparent border-0 p-0"
                  id="userMenuButton"
                >
                  <div
                    className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center"
                    style={{ width: "35px", height: "35px" }}
                  >
                    {"V.A"}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu aria-labelledby="userMenuButton">
                  <Dropdown.Item href="#">Profile</Dropdown.Item>
                  <Dropdown.Item href="#">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
