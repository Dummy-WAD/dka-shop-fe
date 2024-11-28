import React, { useEffect, useState } from "react";
import ListImage from "../../components/ListImage/ListImage";
import classes from "./ProductDetailCustomer.module.css";
import { Button, Divider, Typography } from "@mui/material";
import { CartIcon, MinusIcon, PlusIcon } from "../../icon/Icon";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProductForCustomerById } from "../../api/product";
import { toast } from "react-toastify";
import { addProductToCart } from "../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCartItems } from "../../redux/slice/cartSlice";

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
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(null); // Initial value set to 1
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.auth.userInfo.role);

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
      setSelectedId(variant ? variant.id : null);
    }
  };

  useEffect(() => {
    getSelectedVariantQuantity(selectedColor, selectedSize);
  }, [selectedColor, selectedSize, product]);

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

  const validate = (quan) => {
    let error = null;
    if (!(selectedColor && selectedSize))
      error = "Please choose color and size of the product";
    else if (!/^\d*$/.test(quan)) error = "Quantity must be an integer";
    else if (quan < 1) error = "Quantity must be at least 1";
    else if (quan > quantity) error = "Quantity exceeds available stock";
    return error;
  };

  const onDecrease = () => {
    const error = validate(selectedQuantity);
    if (!error && selectedQuantity != 1) {
      setSelectedQuantity(Number(selectedQuantity) - 1);
      setErrorMessage("");
    }
  };

  const onTextChange = (input) => {
    if (input == "") setSelectedQuantity("");
    else {
      const error = validate(input);
      if (error) {
        if (input < 1) {
          setSelectedQuantity(1);
        } else {
          setSelectedQuantity(quantity);
        }
        setErrorMessage(error);
      } else {
        setSelectedQuantity(Number(input));
        setErrorMessage("");
      }
    }
  };

  const onIncrease = () => {
    const error = validate(selectedQuantity);
    if (!error && selectedQuantity != quantity) {
      setSelectedQuantity(Number(selectedQuantity) + 1);
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    const error = validate(selectedQuantity);
    if (!error) {
      try {
        const res = await addProductToCart({
          productVariantId: selectedId,
          quantity: selectedQuantity,
        });
        dispatch(setTotalCartItems(res.totalCartItems));
        toast.success("Add product to cart successfully");
        setErrorMessage(null);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        fetchProductDetail(productId);
      }
    } else {
      setErrorMessage(error);
    }
  };

  return (
    <div className="wrapper" style={{ minHeight: "60vh", marginTop: "2rem" }}>
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
              {product?.categoryName ?? "no category"}
            </p>
          </div>

          {product.price === product.priceDiscounted ? (
            <div className={classes.row}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "var(--user-color)" }}
              >
                ${product.price?.toFixed(2)}
              </Typography>
            </div>
          ) : (
            <div className={classes.row}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "var(--user-color)" }}
              >
                ${product.priceDiscounted?.toFixed(2)}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#757575", textDecoration: "line-through" }}
              >
                ${product.price?.toFixed(2)}
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
                  onClick={() => {
                    if (
                      availableSizes.some((sizeItem) => sizeItem.size === size)
                    )
                      handleSelectSize(size);
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.row_quantity}>
              {quantity > 20 ? <p>Remaining </p> : <p>Only remaining </p>}
              <p style={{ color: "#000", fontSize: "20px" }}>
                {Number(quantity).toLocaleString()}
              </p>
              <p>products</p>
            </div>
          </div>
          <div className={classes.row_error}>{errorMessage} </div>
          <div className={classes.row}>
            <div className={classes.quantity_selector}>
              <div className={classes.icon} onClick={onDecrease}>
                <MinusIcon />
              </div>
              <input
                type="number"
                value={selectedQuantity}
                onChange={(e) => onTextChange(e.target.value)}
              />
              <div className={classes.icon} onClick={onIncrease}>
                <PlusIcon />
              </div>
            </div>
            {userRole === "CUSTOMER" && (
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
            )}
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
