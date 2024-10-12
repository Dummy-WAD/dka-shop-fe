import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CartIcon,
  NotificationIcon,
  SearchIcon,
  UserIcon,
} from "../../../icon/Icon";
import searchSlice from "../../../redux/slice/searchSlice";

const NavbarUser = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState();
  const dispatch = useDispatch();

  return (
    <header id="navbar-user" className="px-5 py-2 bg-white">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/" className="">
          <img alt="logo" src="/logo.png" width={100} />
        </a>

        <div
          className="position-relative"
          style={{ width: "300px" }}
          role="search"
        >
          <input
            type="text"
            className="form-control text-dark bg-light w-full"
            placeholder="Search..."
            value={searchText}
            maxLength={100}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                dispatch(searchSlice.actions.setSearchText(searchText));
            }}
          />
          <SearchIcon className="position-absolute top-50 translate-middle end-0" />
        </div>

        {isAuthenticated ? (
          <div className="d-flex column-gap-5">
            <div className="d-flex column-gap-2 justify-content-center align-items-center">
              <CartIcon />
              Cart
            </div>
            <div className="d-flex column-gap-2 justify-content-center align-items-center">
              <NotificationIcon />
              Notification
            </div>
            <div className="d-flex column-gap-2 justify-content-center align-items-center">
              <UserIcon />
              User
            </div>
          </div>
        ) : (
          <div className="d-flex column-gap-3">
            <Link to={"/login"} className="text-dark">
              Login
            </Link>
            <Link className="text-dark">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarUser;
