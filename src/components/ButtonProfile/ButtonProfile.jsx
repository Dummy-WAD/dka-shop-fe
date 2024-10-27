import { Typography } from "@mui/material";
import classes from "./ButtonProfile.module.css"

const ButtonProfile = ({icon, text, active}) => {
    return (
        <div className={`${classes.container} ${active ? classes.active : null}`}>
            <div className={classes.icon}>{icon}</div>
            <Typography>{text}</Typography>
        </div>
    )
}

export default ButtonProfile;