import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CheckoutSummary.module.css";
import { VoucherIcon } from "../../icon/Icon";
const CheckoutSummary = ({
  deliveryService,
  productCost,
  totalCost,
  handlePlaceOrder,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionHeaderVoucher}>
          <VoucherIcon />
          <span className={styles.voucherText}>Voucher</span>
          <span className={styles.pickOne}>Pick one</span>
        </div>
      </div>

      <div className={styles.sectionPaymentOptions}>
        <div className={styles.sectionHeaderOptionsPayment}>
          <span className={styles.icon}>
            <svg
              width="22"
              height="20"
              viewBox="0 0 39 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.0677 7.12402H5.24055C4.60343 7.12402 3.9924 7.35449 3.54189 7.76473C3.09138 8.17496 2.83829 8.73136 2.83829 9.31152V26.8115C2.83829 27.3917 3.09138 27.9481 3.54189 28.3583C3.9924 28.7686 4.60343 28.999 5.24055 28.999H34.0677C34.7048 28.999 35.3158 28.7686 35.7663 28.3583C36.2169 27.9481 36.47 27.3917 36.47 26.8115V9.31152C36.47 8.73136 36.2169 8.17496 35.7663 7.76473C35.3158 7.35449 34.7048 7.12402 34.0677 7.12402ZM34.0677 9.31152V12.5928H5.24055V9.31152H34.0677ZM5.24055 26.8115V14.7803H34.0677V26.8115H5.24055Z"
                fill="black"
              />
              <path
                d="M7.64282 22.4365H19.6541V24.624H7.64282V22.4365Z"
                fill="black"
              />
            </svg>
          </span>
          <span
            style={{
              fontWeight: "bold",
              marginLeft: "10px",
            }}
          >
            Payment method
          </span>
        </div>
        <div className={styles.paymentOptions}>
          <label className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => handlePaymentChange("cash")}
            />
            Cash on delivery
          </label>
          <label className={styles.paymentOption}>
            <input
              type="radio"
              name="payment"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={() => handlePaymentChange("momo")}
            />
            Pay with Momo
          </label>
        </div>
      </div>

      <div className={styles.summaryContainer}>
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span>Product cost</span>
            <span>$ {productCost}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Delivery fee</span>
            <span>$ {deliveryService.deliveryFee}</span>
          </div>

          <div className={`${styles.summaryItem} ${styles.total}`}>
            <span>Total</span>
            <span className={styles.totalAmount}>$ {totalCost}</span>
          </div>
          <button
            className={styles.placeOrderButton}
            onClick={handlePlaceOrder}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};
CheckoutSummary.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  deliveryService: PropTypes.shape({
    deliveryFee: PropTypes.number.isRequired,
  }).isRequired,
  productCost: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  handlePlaceOrder: PropTypes.func.isRequired,
};

export default CheckoutSummary;
