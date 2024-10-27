import { Avatar, Box, Typography } from "@mui/material"
import classes from "./SidebarProfile.module.css"
import avatar from "../../assets/avatar.jpeg"
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import { LocationOn, Lock, Logout, Payment, ContactEmergency } from "@mui/icons-material"
import { Link } from "react-router-dom"

const SidebarProfile = ({firstName, lastName, activeTab = "profile"}) => {
    return (
        <Box className={classes.container}>
            <div className={classes.avatar}>
                <Avatar 
                    alt="avatar"
                    src={avatar}
                    sx={{width: "80px", height: "80px"}}
                />
                <Typography variant="h6" sx={{fontWeight: "500"}}>{lastName} {firstName}</Typography>
            </div>
            <div className={classes.profile}>
                {/* <Link to="/profile">
                    <ButtonProfile icon={<ContactEmergency />} text="My profile" />
                </Link>
                <Link>
                    <ButtonProfile icon={<Lock />} text="Change password" />
                </Link>
                <Link>
                    <ButtonProfile icon={<LocationOn />} text="Address" />
                </Link>
                <Link>
                    <ButtonProfile icon={<Payment />} text="Purchase history" />
                </Link>
                <Link>
                    <ButtonProfile icon={<Logout />} text="Sign out" />
                </Link> */}
                <ButtonProfile active={activeTab == "profile"} icon={<ContactEmergency />} text="My profile" />
                <ButtonProfile active={activeTab == "changePassword"} icon={<Lock />} text="Change password" />               
                <ButtonProfile active={activeTab == "address"} icon={<LocationOn />} text="Address" />               
                <ButtonProfile active={activeTab == "purchase"} icon={<Payment />} text="Purchase history" />               
                <ButtonProfile active={activeTab == "signOut"} icon={<Logout />} text="Sign out" />               
            </div>
        </Box>
    )
}

export default SidebarProfile;