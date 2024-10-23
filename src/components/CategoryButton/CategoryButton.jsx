import classes from "./CategoryButton.module.css";

const CategoryButton = ({ onClick, children, type = "button", className }) => {
  return (
    <button
      className={`${classes.category_button} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
