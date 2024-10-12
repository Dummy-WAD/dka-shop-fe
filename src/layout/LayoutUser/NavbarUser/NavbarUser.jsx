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

  return <></>;
};

export default NavbarUser;
