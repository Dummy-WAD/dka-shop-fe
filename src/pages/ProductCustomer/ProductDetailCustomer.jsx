import React, { useEffect, useState } from "react";
import ListImage from "../../components/ListImage/ListImage";
import classes from "./ProductDetailCustomer.module.css";
import { Button, Divider, Typography } from "@mui/material";
import { CartIcon, MinusIcon, PlusIcon } from "../../icon/Icon";
import { useParams } from "react-router-dom";
import { getDetailProductForCustomerById } from "../../api/product";
import { toast } from "react-toastify";

function ProductDetailCustomer() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantity, setQuantity] = useState(null); // Initial value set to 1

  const fetchProductDetail = async (productId) => {
    try {
      const res = await getDetailProductForCustomerById(productId);
      setProduct(res);
      setColors([...new Set(res.productVariants.map((item) => item.color))]);
      setSizes([...new Set(res.productVariants.map((item) => item.size))]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    getAvailabelSizes(color);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  const getSelectedVariantQuantity = (selectedColor, selectedSize) => {
    if (product.productVariants) {
      const variant = product.productVariants.find(
        (item) => item.size == selectedSize && item.color == selectedColor
      );
      setQuantity(variant ? variant.quantity : null);
    }
  };

  useEffect(() => {
    getSelectedVariantQuantity(selectedColor, selectedSize);
  }, [selectedColor, selectedSize]);

  const getAvailabelSizes = (selectedColor) => {
    setAvailableSizes(
      product.productVariants.filter(
        (productVariant) => productVariant.color === selectedColor
      )
    );
  };

  useEffect(() => {
    fetchProductDetail(productId);
  }, [productId]);

  const validate = () => {
    let error = null;
    if (!(selectedColor && selectedSize))
      error = "Please choose color and size of the product";
    else if (!/^\d*$/.test(selectedQuantity))
      error = "Quantity must be an integer";
    else if (selectedQuantity < 1) error = "Quantity must be greater than 0";
    else if (selectedQuantity > quantity)
      error = "Quantity exceeds available stock";
    return error;
  };

  const handleSubmit = () => {
    const error = validate();
    if (!error) {
      console.log(selectedColor, selectedSize, selectedQuantity, quantity);
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="wrapper" style={{ minHeight: "60vh", marginTop: "30px" }}>
      <div className={classes.container}>
        <div className={classes.container_left}>
          <ListImage
            primaryImage="https://5.imimg.com/data5/VH/BL/PA/SELLER-96763193/fond-of-mens-cotton-shirts.jpg"
            otherImages={[
              "https://5.imimg.com/data5/VH/BL/PA/SELLER-96763193/fond-of-mens-cotton-shirts.jpg",
              "https://5.imimg.com/data5/VH/BL/PA/SELLER-96763193/fond-of-mens-cotton-shirts.jpg",
              "https://5.imimg.com/data5/VH/BL/PA/SELLER-96763193/fond-of-mens-cotton-shirts.jpg",
              "https://5.imimg.com/data5/VH/BL/PA/SELLER-96763193/fond-of-mens-cotton-shirts.jpg",
              "https://5.imimg.com/data5/VH/BL/PA/SELLER-96763193/fond-of-mens-cotton-shirts.jpg",
              "https://5.imimg.com/data5/VH/BL/PA/SELLER-96763193/fond-of-mens-cotton-shirts.jpg",
            ]}
          />
        </div>
        <div className={classes.container_right}>
          <Typography variant="h5" sx={{ mt: "-2rem", fontWeight: 600 }}>
            {product.name}
          </Typography>
          <div className={classes.row}>
            <p>Category</p>
            <p style={{ color: "#000", fontSize: "20px" }}>
              {product.categoryName}
            </p>
          </div>

          {product.price === product.priceDiscounted ? (
            <div className={classes.row}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "var(--user-color)" }}
              >
                ${product.price}
              </Typography>
            </div>
          ) : (
            <div className={classes.row}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "var(--user-color)" }}
              >
                ${product.priceDiscounted}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#757575", textDecoration: "line-through" }}
              >
                ${product.price}
              </Typography>
            </div>
          )}

          <div className={classes.grid}>
            <p>Color</p>
            <div className={classes.row}>
              {colors.map((color, index) => (
                <div
                  className={`${classes.tag} ${
                    selectedColor == color ? classes.selected : ""
                  }`}
                  key={color}
                  onClick={() => handleSelectColor(color)}
                >
                  {color}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.grid}>
            <p>Size</p>
            <div className={classes.row}>
              {sizes.map((size) => (
                <div
                  className={`${classes.tag} ${
                    availableSizes.some((sizeItem) => sizeItem.size === size)
                      ? ""
                      : classes.disabled
                  } ${size == selectedSize ? classes.selected : ""}`}
                  key={size}
                  onClick={() => handleSelectSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.row}>
            <p>Stock Quantity</p>
            <p style={{ color: "#000", fontSize: "20px" }}>
              {Number(quantity).toLocaleString()}
            </p>
          </div>
          <div className={classes.row}>
            <div className={classes.quantity_selector}>
              <div
                className={classes.icon}
                onClick={() =>
                  setSelectedQuantity(Number(selectedQuantity) - 1)
                }
              >
                <MinusIcon />
              </div>
              <input
                type="number"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
              />
              <div
                className={classes.icon}
                onClick={() =>
                  setSelectedQuantity(Number(selectedQuantity) + 1)
                }
              >
                <PlusIcon />
              </div>
            </div>
            <Button
              variant="outlined"
              startIcon={<CartIcon />}
              sx={{
                color: "var(--user-second-color)",
                flex: 1,
                padding: 1,
                fontSize: "16px",
                borderColor: "var(--user-second-color)",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "var(--user-second-color)",
                  color: "white",
                },
                flex: 0.6,
              }}
              onClick={handleSubmit}
            >
              Add To Cart
            </Button>
          </div>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mt: "2rem", mb: "1rem" }}
          >
            PRODUCT INFORMATION
          </Typography>
          <Divider />
          <div className={classes.description}>
            {product.description &&
              product.description
                .toString()
                .split("\\n")
                .map((line, index) => (
                  <div key={index}>
                    {line}
                    <br />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCustomer;
