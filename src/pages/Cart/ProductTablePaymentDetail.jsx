import styles from "./ProductTable.module.css";
import reactImage from "../../assets/avatar.jpeg";
const products = [
  {
    id: 1,
    name: "[NEW][V6 SIREN HOLIDAY] Son Kem Lì Merzy The First Velv",
    variant: "Nâu đất, Holiday",
    amount: 2,
    price: 18.99,
    total: 37.98,
    imageUrl: reactImage,
  },
  {
    id: 2,
    name: "[NEW][V6 SIREN HOLIDAY] Son Kem Lì Merzy The First Velv",
    variant: "Nâu đất, Holiday",
    amount: 2,
    price: 18.99,
    total: 37.98,
    imageUrl: reactImage,
  },
  {
    id: 3,
    name: "[NEW][V6 SIREN HOLIDAY] Son Kem Lì Merzy The First Velv",
    variant: "Nâu đất, Holiday",
    amount: 2,
    price: 18.99,
    total: 37.98,
    imageUrl: reactImage,
  },
];

const ProductTable = () => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <span>Product</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <div className={styles.tableBody}>
        {products.map((product) => (
          <div key={product.id} className={styles.tableRow}>
            <div className={styles.productInfo}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInforRight}>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productVariant}>
                  Variant: {product.variant}
                </div>
                <div className={styles.productAmount}>
                  Amount: {product.amount}
                </div>
              </div>
            </div>
            <div className={styles.productPrice}>
              ${product.price.toFixed(2)}
            </div>
            <div className={styles.productTotal}>
              ${product.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
