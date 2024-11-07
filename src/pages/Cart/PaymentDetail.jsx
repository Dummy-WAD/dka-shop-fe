import CheckoutSummary from "./CheckoutSummary";
import css from "./PaymentDetail.module.css";
import ProductTable from "./ProductTablePaymentDetail";
import ShippingAddress from "./ShippingAddress";
import PropTypes from "prop-types";
const PaymentDetail = (props) => {
  const { valuePaymentDetails } = props;
  const { preparedOrderItems, deliveryService, productCost, totalCost } =
    valuePaymentDetails;
  return (
    <div className={css.paymentDetailContainer}>
      <ShippingAddress />
      <ProductTable products={preparedOrderItems} />
      <CheckoutSummary
        deliveryService={deliveryService}
        productCost={productCost}
        totalCost={totalCost}
      />
    </div>
  );
};
PaymentDetail.propTypes = {
  valuePaymentDetails: PropTypes.shape({
    preparedOrderItems: PropTypes.array.isRequired,
    deliveryService: PropTypes.string.isRequired,
    productCost: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaymentDetail;
