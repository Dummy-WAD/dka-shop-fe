import { Button } from "@mui/material";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import classes from "./Home.module.css";

function Home() {
  return (
    <div className="wrapper" style={{ minHeight: "60vh" }}>
      {/* Categories section */}
      <div className={classes.categories}>
        <div style={classes.categoriesHeader}>
          <h1 style={{ padding: "20px 0 "}}>Categories</h1>
        </div>
        <div className={classes.categoriesBody}>
          <CategoryButton>Category 1</CategoryButton>
          <CategoryButton>Category 2</CategoryButton>
          <CategoryButton>Category 3</CategoryButton>
          <CategoryButton>Category 4</CategoryButton>
          <CategoryButton>Category 5</CategoryButton>
          <CategoryButton>Category 6</CategoryButton>
        </div>
      </div>

      {/* Best seller section */}
      <div style={classes.bestSellerProduct}>
        <div style={classes.bestSellerHeader}>
          <h1>Best seller</h1>
        </div>
        <div style={classes.bestSellerBody}>All best seller product</div>
      </div>

      {/* More product button */}
      <div style={classes.moreProductBtn}>
        <Button>More product</Button>
      </div>
    </div>
  );
}

export default Home;
