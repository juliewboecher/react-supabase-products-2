import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(URL, {
          headers: {
            apikey: APIKEY,
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch {
        setError("Kunne ikke hente produkter fra Supabase.");
      }
    }
    loadProducts();
  }, []);

  return (
    <main className="app">
      <h1 className="page-title">All Products</h1>
      {error && <p className="status-msg">{error}</p>}
      <section className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
