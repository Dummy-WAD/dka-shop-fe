import css from "./ShowProducts.module.css";
import { VoucherIcon } from "../../icon/Icon";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import {
  editCartItemQuantity,
  getAllProductsInCart,
  getDeliveryService,
  prepareOrder,
  removeProductFromCart,
} from "../../api/cart";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setTotalCartItems } from "../../redux/slice/cartSlice";

const DeliveryOptions = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <div className={css.optionsContainer}>
      {options.map((option) => (
        <label
          key={option.id}
          className={`${css.option} ${
            selectedOption === option.id ? css.selected : ""
          }`}
        >
          <input
            type="radio"
            name="delivery"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => setSelectedOption(option.id)}
            className={css.radioInput}
          />
          <span className={css.labelText}>{option.name}</span>
          <span
            className={`${css.price} ${
              option.deliveryFee === 0 ? css.freePrice : ""
            }`}
          >
            {option.deliveryFee === 0
              ? "Free"
              : `$${option.deliveryFee.toFixed(2)}`}
          </span>
        </label>
      ))}
    </div>
  );
};
DeliveryOptions.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

const TotalCost = ({
  totalCost,
  deliveryCost,
  setValue,
  products,
  listItemChecked,
  selectedOption,
  deliveryOptions,
  setValuePaymentDetails,
  setModalPriceChanged,
  setOpenModal,
}) => {
  function createCartData(
    products,
    listItemChecked,
    selectedOption,
    deliveryOptions
  ) {
    const cartItems = products
      .filter((product) => listItemChecked.includes(product.cartItemId))
      .map((product) => ({
        id: product.cartItemId,
        currentPrice: product.price,
      }));
    const deliveryService = deliveryOptions.find(
      (option) => option.id === selectedOption
    );

    return {
      cartItems: cartItems,
      deliveryService: {
        id: deliveryService.id,
        deliveryFee: deliveryService.deliveryFee,
      },
    };
  }
  const handlePrepareOrder = async () => {
    try {
      if (selectedOption === undefined) {
        toast.error("Please select a delivery option");
        return;
      }
      if (listItemChecked.length === 0) {
        toast.error("Please select at least one product to checkout");
        return;
      }
      const data = createCartData(
        products,
        listItemChecked,
        selectedOption,
        deliveryOptions
      );
      const response = await prepareOrder(data);
      if (response.costChange) {
        setModalPriceChanged(true);
      } else {
        setValuePaymentDetails(response);
        setValue("2");
      }
    } catch (error) {
      const { code, message } = error.response.data;
      if (code === 400 && message === "Quantity of product is not enough!") {
        setOpenModal(true);
      }
    }
  };

  return (
    <div className={css.containerTotalCost}>
      <div className={css.costRow}>
        <span className={css.label}>Total product cost</span>
        <span className={css.amount}>${totalCost.toFixed(2)}</span>
      </div>
      <hr className={css.divider} />
      <div className={css.costRow}>
        <span className={css.label}>Delivery cost</span>
        <span className={css.amount}>${deliveryCost.toFixed(2)}</span>
      </div>
      <hr className={css.divider} />
      <div className={css.totalRow}>
        <span className={css.totalLabel}>Total payable amount</span>
        <span className={css.totalAmount}>
          ${(totalCost + deliveryCost).toFixed(2)}
        </span>
      </div>
      <button
        className={css.checkoutButton}
        onClick={() => {
          handlePrepareOrder();
        }}
      >
        Check out
      </button>
    </div>
  );
};

TotalCost.propTypes = {
  totalCost: PropTypes.number.isRequired,
  deliveryCost: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  listItemChecked: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
  deliveryOptions: PropTypes.array.isRequired,
  setValuePaymentDetails: PropTypes.func.isRequired,
  setModalPriceChanged: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

const CartItem = ({
  item,
  onCheckItem,
  listItemChecked,
  handleRemoveProduct,
  handleChangeQuantityProduct,
}) => {
  const navigate = useNavigate();
  return (
    <div className={css.cartItemContainer}>
      <input
        type="checkbox"
        className={css.checkbox}
        checked={listItemChecked.includes(item.cartItemId)}
        onClick={() => {
          onCheckItem(item.cartItemId, item.totalPrice);
        }}
        disabled={item.remainingQuantity === 0}
      />
      <div className={css.productImageContainer}>
        <img
          src={item.productImage}
          alt="Product"
          className={css.productImage}
          onClick={() => navigate(`/product/${item.productId}`)}
        />
      </div>

      <div className={css.cartItemRightPanel}>
        <div
          className={css.productName}
          title={item.productName}
          onClick={() => navigate(`/product/${item.productId}`)}
        >
          {item.productName}
        </div>
        <div className={css.productAction}>
          <div>
            <p className={css.productVariant}>
              Variant: {item.size}, {item.color}
            </p>
            <button
              className={css.removeButton}
              onClick={() =>
                handleRemoveProduct(
                  item.productVariantId,
                  item.totalPrice,
                  item.cartItemId
                )
              }
            >
              <span className={css.removeIcon}>✕</span>
              <span className={css.removeText}>Remove from cart</span>
            </button>
          </div>
          <div className={`${css.quantityContainer}`}>
            <button
              className={css.quantityButton}
              onClick={() =>
                handleChangeQuantityProduct({
                  productVariantId: item.productVariantId,
                  quantity: item.orderedQuantity - 1,
                  currentPrice: item.price,
                })
              }
              disabled={
                item.orderedQuantity === 1 || item.remainingQuantity === 0
              }
            >
              -
            </button>
            <span className={css.quantity}>{item.orderedQuantity}</span>
            <button
              className={css.quantityButton}
              onClick={() =>
                handleChangeQuantityProduct({
                  productVariantId: item.productVariantId,
                  quantity: item.orderedQuantity + 1,
                  currentPrice: item.price,
                })
              }
            >
              +
            </button>
          </div>
          <div className={css.price} title={item.price.toFixed(2)}>
            ${item.price.toFixed(2)}
          </div>
          <div className={css.totalPrice} title={item.totalPrice.toFixed(2)}>
            ${item.totalPrice.toFixed(2)}
          </div>
        </div>
        {item.remainingQuantity === 0 && (
          <span className={css.messageOutOfStock}>
            This product is out of stock.
          </span>
        )}
      </div>
    </div>
  );
};
CartItem.propTypes = {
  item: PropTypes.shape({
    cartItemId: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    orderedQuantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    productVariantId: PropTypes.string.isRequired,
    remainingQuantity: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
  }).isRequired,
  onCheckItem: PropTypes.func.isRequired,
  listItemChecked: PropTypes.array.isRequired,
  handleRemoveProduct: PropTypes.func.isRequired,
  handleChangeQuantityProduct: PropTypes.func.isRequired,
};

const ShowProduct = (props) => {
  const label = ["Product", "Amount", "Price", "Total"];
  const ITEM_PER_PAGE = 3;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  // const [listItemChecked, setListItemChecked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const {
    setValue,
    setValuePaymentDetails,
    listItemChecked,
    setListItemChecked,
  } = props;
  const [openModalPriceChanged, setModalPriceChanged] = useState(false);

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState();
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  const onCheckItem = (id, price) => {
    const index = listItemChecked.indexOf(id);
    if (index === -1) {
      setListItemChecked([...listItemChecked, id]);
      setTotalCost((totalCost) => totalCost + price);
    } else {
      setListItemChecked(listItemChecked.filter((item) => item !== id));
      setTotalCost((totalCost) => totalCost - price);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProductsInCart();
      if (response) {
        const cartItemsOutOfStock = response.results.filter(
          (item) => item.orderedQuantity > item.remainingQuantity
        );
        const updatePromises = cartItemsOutOfStock.map((item) =>
          editCartItemQuantity({
            productVariantId: item.productVariantId,
            quantity: item.remainingQuantity,
            currentPrice: item.price,
          })
        );
        response.results.forEach((item) => {
          if (item.remainingQuantity === 0) {
            setListItemChecked(
              listItemChecked.filter((id) => id !== item.cartItemId)
            );
          }
        });
        await Promise.all(updatePromises);
        if (cartItemsOutOfStock.length > 0) {
          const updatedResponse = await getAllProductsInCart();
          if (updatedResponse) {
            const newTotalCost = updatedResponse.results.reduce(
              (total, item) => {
                if (listItemChecked.includes(item.cartItemId)) {
                  return total + item.price * item.orderedQuantity;
                }
                return total;
              },
              0
            );
            dispatch(setTotalCartItems(updatedResponse.totalCartItems));
            setTotalCost(newTotalCost);
            setProducts(updatedResponse.results);
          }
        } else {
          const newTotalCost = response.results.reduce((total, item) => {
            if (listItemChecked.includes(item.cartItemId)) {
              return total + item.price * item.orderedQuantity;
            }
            return total;
          }, 0);
          dispatch(setTotalCartItems(response.totalCartItems));
          setTotalCost(newTotalCost);
          setProducts(response.results);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products in cart");
    }
  };

  const handleRemoveProduct = async (
    productVariantId,
    totalPrice,
    cartItemId
  ) => {
    try {
      const response = await removeProductFromCart(productVariantId);
      if (response) {
        if (listItemChecked.includes(cartItemId)) {
          setTotalCost((totalCost) => totalCost - totalPrice);
        }
        await fetchProducts();

        const newTotalPages = Math.ceil(
          response.totalCartItems / ITEM_PER_PAGE
        );
        if (page > newTotalPages) {
          setPage(newTotalPages);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from cart");
    }
  };

  const handleChangeQuantityProduct = async (data = {}) => {
    try {
      const { productVariantId, quantity, currentPrice } = data;
      const response = await editCartItemQuantity({
        productVariantId,
        quantity,
        currentPrice,
      });
      if (response) {
        await fetchProducts();
      }
    } catch (error) {
      console.error(error);
      const { code, message } = error.response.data;
      if (code === 400 && message === "Quantity exceeds available stock") {
        setOpenModal(true);
      } else if (
        code === 400 &&
        message ===
          "The price of this product has been updated. Please check the new price"
      ) {
        setModalPriceChanged(true);
      } else toast.error("Failed to update quantity");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const selectedDeliveryOption = deliveryOptions.find(
      (option) => option.id === selectedOption
    );
    setDeliveryCost(
      selectedDeliveryOption ? selectedDeliveryOption.deliveryFee : 0
    );
  }, [selectedOption, deliveryOptions]);

  const fetchDeliveryOptions = async () => {
    try {
      const response = await getDeliveryService();
      if (response) {
        setDeliveryOptions(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeliveryOptions();
  }, []);

  const totalPages = Math.ceil(products.length / ITEM_PER_PAGE);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice(
    (page - 1) * ITEM_PER_PAGE,
    page * ITEM_PER_PAGE
  );

  return (
    <>
      <div className={css.containerShowProducts}>
        <div className={css.leftPanel}>
          <div className={css.headerRow}>
            {label.map((item, index) => (
              <div key={index} className={css.headerItem}>
                {item}
              </div>
            ))}
          </div>
          <div>
            {paginatedProducts.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onCheckItem={onCheckItem}
                listItemChecked={listItemChecked}
                handleRemoveProduct={handleRemoveProduct}
                handleChangeQuantityProduct={handleChangeQuantityProduct}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {products && products.length > 0 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="black"
                size="large"
              />
            )}
          </div>
          {paginatedProducts &&
            paginatedProducts.length === 0 &&
            products &&
            products.length === 0 && (
              <div className={css.emptyContainer}>
                <div className={css.emptyTitle}>
                  Your cart is currently empty. Browse our products and add
                  items to your cart!
                </div>
                <div>
                  <Link to="/">
                    <button className={css.emptyButton}>Start shopping!</button>
                  </Link>
                </div>
              </div>
            )}
        </div>
        <div className={css.rightPanel}>
          <div className={css.headerRightPanel}>Order information</div>
          <div className={css.voucher}>
            <div className={css.iconVoucher}>
              <VoucherIcon />
              <span>Voucher</span>
            </div>
            <div className={css.voucherText}>Pick one</div>
          </div>

          <DeliveryOptions
            options={deliveryOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <TotalCost
            totalCost={totalCost}
            deliveryCost={deliveryCost}
            setValue={setValue}
            products={products}
            listItemChecked={listItemChecked}
            selectedOption={selectedOption}
            deliveryOptions={deliveryOptions}
            setValuePaymentDetails={setValuePaymentDetails}
            setModalPriceChanged={setModalPriceChanged}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Out of Stock
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            The quantity you requested exceeds the available stock. Please check
            the new quantity.
          </Typography>
          <Button
            onClick={async () => {
              await fetchProducts();
              setOpenModal(false);
            }}
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            style={{
              padding: "6px",
              backgroundColor: "#274c50",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "16px",
              transition: "background-color 0.3s",
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openModalPriceChanged}
        onClose={() => setModalPriceChanged(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Price Changed
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            The price of this product has been updated. Please check the new
            price.
          </Typography>
          <Button
            onClick={async () => {
              await fetchProducts();
              setModalPriceChanged(false);
            }}
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            style={{
              padding: "6px",
              backgroundColor: "#274c50",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "16px",
              transition: "background-color 0.3s",
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
};
ShowProduct.propTypes = {
  setValue: PropTypes.func.isRequired,
  setValuePaymentDetails: PropTypes.func.isRequired,
  listItemChecked: PropTypes.array.isRequired,
  setListItemChecked: PropTypes.func.isRequired,
};

export default ShowProduct;
