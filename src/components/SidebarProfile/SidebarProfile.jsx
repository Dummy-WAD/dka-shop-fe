import { Avatar, Box, Typography } from "@mui/material"
import classes from "./SidebarProfile.module.css"
import avatar from "../../assets/avatar.jpeg"
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import { LocationOn, Lock, Logout, Payment, ContactEmergency } from "@mui/icons-material"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../helper"
import authSlice from "../../redux/slice/authSlice"

const SidebarProfile = ({firstName, lastName}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickToLogout = async () => {
        await logout();
        dispatch(
          authSlice.actions.setAuthInfo({
            isAuthenticated: false,
            userInfo: {},
          })
        );
        navigate("/login");
    };

    return (
        <Box className={classes.container}>
            <div className={classes.avatar}>
                <Avatar 
                    alt="avatar"
                    src={avatar}
                    sx={{width: "80px", height: "80px"}}
                />
                <Typography variant="h6" sx={{fontWeight: "500", textAlign: "center"}}>{lastName} {firstName}</Typography>
            </div>
            <div className={classes.profile}>
                <NavLink to="/profile">
                    {({isActive}) => (
                        <ButtonProfile icon={<ContactEmergency />} text="My profile" active={isActive} />
                    )}
                </NavLink>
                <NavLink to="/change-password">
                    {({isActive}) => (
                        <ButtonProfile icon={<Lock />} text="Change password" active={isActive} />
                    )}
                </NavLink>
                <NavLink to="/address">
                    {({isActive}) => (
                        <ButtonProfile icon={<LocationOn />} text="Address" active={isActive} />
                    )}
                </NavLink>
                <NavLink to="/purchase">
                    {({isActive}) => (
                        <ButtonProfile icon={<Payment />} text="Purchase history" active={isActive} />
                    )}
                </NavLink>
                <Link onClick={handleClickToLogout}>
                    <ButtonProfile icon={<Logout />} text="Sign out" active={false} />
                </Link>
            </div>
        </Box>
    )
}

export default SidebarProfile;