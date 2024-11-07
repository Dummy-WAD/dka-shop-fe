import styles from "./ProductTable.module.css";
import PropTypes from "prop-types";

const ProductTable = (props) => {
  const { products } = props;
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <span>Product</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <div className={styles.tableBody}>
        {products.map((product) => (
          <div key={product.cartItemId} className={styles.tableRow}>
            <div className={styles.productInfo}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInforRight}>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productVariant}>
                  Variant: {product.size}, {product.color}
                </div>
                <div className={styles.productAmount}>
                  Amount: {product.quantity}
                </div>
              </div>
            </div>
            <div className={styles.productPrice}>
              ${product.price.toFixed(2)}
            </div>
            <div className={styles.productTotal}>
              ${(product.price * product.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
ProductTable.propTypes = {
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
};

export default ProductTable;
