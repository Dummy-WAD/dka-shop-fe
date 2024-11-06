import CheckoutSummary from "./CheckoutSummary";
import css from "./PaymentDetail.module.css";
import ProductTable from "./ProductTablePaymentDetail";
import ShippingAddress from "./ShippingAddress";
const PaymentDetail = () => {
  return (
    <div className={css.paymentDetailContainer}>
      <ShippingAddress />
      <ProductTable />
      <CheckoutSummary />
    </div>
  );
};
export default PaymentDetail;
