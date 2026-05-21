import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import LoginForm from "./components/LoginForm";
import SearchBar from "./components/SearchBar";
import useDebounce from "./hooks/useDebounce";
import styles from "./App.module.css";
import type { Product } from "./types/product";

const API_URL = "http://localhost:3000";
const API_KEY = "my-secret-key";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [cart, setCart] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleAddToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    } else {
      setCart(cart.filter((itemId) => itemId !== id));
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_URL}/product?search=${debouncedQuery}`,
          {
            headers: {
              "x-api-key": API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401 || res.status === 403) {
          handleLogout();
          return;
        }

        if (!res.ok) throw new Error("Gagal mengambil data produk");

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedQuery, token]);

  if (!token) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Product List</h1>
        <button onClick={handleLogout} style={{ padding: "6px 12px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <SearchBar value={query} onChange={setQuery} />
      <p>🛒 Cart: {cart.length} item | {products.length} produk ditemukan</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.image
    ? `http://localhost:3000/uploads/${product.image}`
    : "/images/placeholder.jpg"}
            isInCart={cart.includes(product.id)}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;