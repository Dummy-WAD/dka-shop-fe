import { Button } from "@mui/material";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import { AllArrowIcon } from "../../icon/Icon";
import classes from "./Home.module.css";

function Home() {
  return (
    <div className="wrapper" style={{ minHeight: "60vh" }}>
      {/* Categories section */}
      <div className={classes.categories}>
        <div className={classes.categoriesHeader}>
          <h1 style={{ padding: "20px 0 " }}>Categories</h1>
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
      <div className={classes.bestSellerProduct}>
        <div className={classes.bestSellerHeader}>
          <div>
            <h1>Best seller</h1>
            <div>Exciting products at irresistible prices</div>
          </div>
          <div>
            <CategoryButton className={classes.outlined} >
              {" All products"}
              <AllArrowIcon />
            </CategoryButton>
          </div>
        </div>
        <div className={classes.bestSellerBody}>All best seller product</div>
        {/* More product button */}
        <div style={{ display: "flex", justifyContent: "center"}}>
          <CategoryButton className={classes.moreProductBtn} >
            {"All products"}
          </CategoryButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
