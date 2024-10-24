import CategoryButton from "../../components/CategoryButton/CategoryButton";
import { AllArrowIcon } from "../../icon/Icon";
import classes from "./Home.module.css";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useEffect, useState } from "react";
import { getBestSellerProductsForCustomer } from "../../api/product";
import { getBestSellerCategoriesForCustomer } from "../../api/category";
import { useNavigate } from "react-router-dom"

function Home() {
  const [listProducts, setListProducts] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const navigate = useNavigate();

  const fetchProductsAndCategories = async () => {
    try {
      const products = await getBestSellerProductsForCustomer({ limit: 20 });
      setListProducts(products);

      const categories = await getBestSellerCategoriesForCustomer({ limit: 6 });
      setListCategories(categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const handleClickShowAllProducts = () => {
    navigate(`/search`);
    window.scrollTo(0, 0);
  };

  const handleFilterProductsByCategory = async (categoryId) => {
    const newCategoryId = categoryId === currentCategoryId ? null : categoryId;
  
    const productsByCategory = await getBestSellerProductsForCustomer(
      newCategoryId ? { categoryId: newCategoryId } : {}
    );
  
    setListProducts(productsByCategory);
    setCurrentCategoryId(newCategoryId);
  };

  return (
    <>
      <div className="banner" style={{ minWidth: "1200px", overflow: "hidden", margin: "0 auto" }}>
        <img
          src="/banner.png"
          alt="Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="wrapper" style={{ minHeight: "60vh", margin: "30px 80px", marginBottom: 0 }}>
        <div className={classes.categories}>
          <div className={classes.categoriesHeader}>
            <h2 style={{ padding: "20px 0 " }}>Categories</h2>
          </div>
          <div className={classes.categoriesBody}>
            {
              listCategories.length > 0 ? listCategories.map((category, index) =>
                <div key={index}>
                  <CategoryButton className={`${currentCategoryId === category.id ? classes.borderActiveBtn : ''}`} onClick={() => handleFilterProductsByCategory(category.id)}>{category?.name || ""}</CategoryButton>
                </div>
              ) : <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>No result found</div>
            }
          </div>
        </div>
        <div className={classes.bestSellerProduct}>
          <div className={classes.bestSellerHeader}>
            <div>
              <h2>Best seller</h2>
              <div style={{ color: "#9CA3AF", fontSize: "16px" }}>Exciting products at irresistible prices!</div>
            </div>
            <div>
              <CategoryButton className={classes.allProductBtn} onClick={handleClickShowAllProducts}>
                {" All products"}
                <AllArrowIcon />
              </CategoryButton>
            </div>
          </div>
          <div className={classes.bestSellerBody}>
            <div className={classes.listProduct}>
              {listProducts?.length > 0 ? listProducts.map((item, index) => (
                <CardProduct key={index} product={{ ...item, primaryImageUrl: item.imageUrl }} />
              )) : <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>No result found</div>}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CategoryButton className={classes.moreProductBtn} onClick={handleClickShowAllProducts}>
              { "All products" }
            </CategoryButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
