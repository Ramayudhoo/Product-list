import { useState } from "react";
import ProductCard from "./components/ProductCard";
import styles from './App.module.css';


const products = [
  {
    id: 1,
    name: "Laptop Gaming",
    price: 6000000,
    imageUrl: "/images/Laptop_Gaming.jpg",
  },
  {
    id: 2,
    name: "PC Gaming",
    price: 10000000,
    imageUrl: "/images/PC_Gaming.jpg",
  },
  {
    id: 3,
    name: "Mouse Gaming",
    price: 300000,
    imageUrl: "/images/Mouse_Gaming.jpg",
  }
];

function App() {
  const [cart, setCart] = useState<number[]>([]);

  const handleAddToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    } else {
      setCart(cart.filter((itemId) => itemId !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Product List</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard 
          key={product.id} 
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl} 
          isInCart={cart.includes(product.id)}
          onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;