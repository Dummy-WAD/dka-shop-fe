import { Avatar, Box, Typography } from "@mui/material"
import classes from "./SidebarProfile.module.css"
import avatar from "../../assets/avatar.jpeg"
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import { LocationOn, Lock, Logout, Payment, ContactEmergency } from "@mui/icons-material"
import { NavLink } from "react-router-dom"

const SidebarProfile = ({firstName, lastName}) => {
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
                <NavLink to="/signout">
                    {({isActive}) => (
                        <ButtonProfile icon={<Logout />} text="Sign out" active={isActive} />
                    )}
                </NavLink>
                {/* <ButtonProfile active={activeTab == "profile"} icon={<ContactEmergency />} text="My profile" />
                <ButtonProfile active={activeTab == "changePassword"} icon={<Lock />} text="Change password" />               
                <ButtonProfile active={activeTab == "address"} icon={<LocationOn />} text="Address" />               
                <ButtonProfile active={activeTab == "purchase"} icon={<Payment />} text="Purchase history" />               
                <ButtonProfile active={activeTab == "signOut"} icon={<Logout />} text="Sign out" />                */}
            </div>
        </Box>
    )
}

export default SidebarProfile;