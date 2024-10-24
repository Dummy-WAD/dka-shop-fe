import React, { useEffect, useState } from "react";
import ListImage from "../../components/ListImage/ListImage";
import classes from "./ProductDetailCustomer.module.css";
import { Button, Divider, Typography } from "@mui/material";
import { CartIcon, MinusIcon, PlusIcon } from "../../icon/Icon";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProductForCustomerById } from "../../api/product";
import { toast } from "react-toastify";

function ProductDetailCustomer() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({ primaryImage: "", otherImages: [] });
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
      navigate("/error");
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

  const onDecrease = () => {
    const error = validate();
    if(error) {
      toast.error(error);
    } else if (selectedQuantity == 1){
      toast.error("Quantity must be greater than 0");
    } else {
      setSelectedQuantity(Number(selectedQuantity) - 1)
    }
  }

  const onIncrease = () => {
    const error = validate();
    if(error) {
      toast.error(error);
    } else if (selectedQuantity == quantity){
      toast.error("Quantity exceeds available stock");
    } else {
      setSelectedQuantity(Number(selectedQuantity) + 1)
    }
  }

  const handleSubmit = () => {
    const error = validate();
    if (!error) {
      console.log(selectedColor, selectedSize, selectedQuantity, quantity);
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="wrapper" style={{ minHeight: "60vh", maxWidth: "1200px", margin : "2rem auto" }}>
      <div className={classes.container}>
        <div className={classes.container_left}>
          <ListImage
            primaryImage={product.primaryImage}
            otherImages={product.otherImages}
          />
        </div>
        <div className={classes.container_right}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
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
                  onClick={() => {if(availableSizes.some((sizeItem) => sizeItem.size === size)) handleSelectSize(size)}}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.row_quantity}>
              {quantity > 20 ? (
                <p>Remaining </p>
              ) : (
                <p>Only remaining </p>
              )}
              <p style={{ color: "#000", fontSize: "20px" }}>{Number(quantity).toLocaleString()}</p>
              <p>products</p>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.quantity_selector}>
              <div
                className={classes.icon}
                onClick={onDecrease}
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
                onClick={onIncrease}
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
