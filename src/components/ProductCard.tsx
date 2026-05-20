
import styles from './ProductCard.module.css';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart?: () => void;
  isInCart?: boolean;
}

function ProductCard({ name, price, imageUrl, onAddToCart, isInCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>Rp {price.toLocaleString("id-ID")}</p>
      <button
        onClick={onAddToCart}
        className={isInCart ? styles.buttonAdded : styles.buttonAdd}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
    </div>
  );
}

export default ProductCard;