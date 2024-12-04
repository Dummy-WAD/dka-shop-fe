import classes from "./IconButton.module.css"
const IconButton = ({onClick, children, type, ...rest}) => {
    return (
        <div className={classes.icon_button} onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export default IconButton