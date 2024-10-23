import classes from "./CategoryButton.module.css";

const CategoryButton = ({ onClick, children, type = "button" }) => {
  return (
    <button 
      className={classes.category_button} 
      onClick={onClick} 
      type={type}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
