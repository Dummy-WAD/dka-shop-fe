import { useState } from "react";
import CheckoutSummary from "./CheckoutSummary";
import css from "./PaymentDetail.module.css";
import ProductTable from "./ProductTablePaymentDetail";
import ShippingAddress from "./ShippingAddress";
import PropTypes from "prop-types";
import { placeOrder } from "../../api/cart";
import { toast } from "react-toastify";
const PaymentDetail = (props) => {
  const { valuePaymentDetails, setValue } = props;
  const { preparedOrderItems, deliveryService, productCost, totalCost } =
    valuePaymentDetails;
  const [selectedAddress, setSelectedAddress] = useState(0);

  function createCartData(
    preparedOrderItems,
    deliveryService,
    selectedAddress
  ) {
    const orderItems = preparedOrderItems.map((item) => {
      return {
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        currentPrice: item.price,
      };
    });
    return {
      orderItems: orderItems,
      deliveryService: {
        id: deliveryService.id,
        deliveryFee: deliveryService.deliveryFee,
      },
      addressId: selectedAddress.id,
    };
  }
  const handlePlaceOrder = async () => {
    try {
      const data = createCartData(
        preparedOrderItems,
        deliveryService,
        selectedAddress
      );
      const response = await placeOrder(data);
      if (response) {
        toast.success("Order placed successfully");
        setValue("3");
      }
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);
    }
  };
  return (
    <div className={css.paymentDetailContainer}>
      <ShippingAddress
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <ProductTable products={preparedOrderItems} />
      <CheckoutSummary
        deliveryService={deliveryService}
        productCost={productCost}
        totalCost={totalCost}
        handlePlaceOrder={handlePlaceOrder}
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
  setValue: PropTypes.func.isRequired,
};

export default PaymentDetail;
