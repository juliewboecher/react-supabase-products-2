import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";

const URL = import.meta.env.VITE_SUPABASE_URL;
const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  async function handleSubmit(productData) {
    await fetch(`${URL}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: APIKEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    navigate(`/products/${id}`);
  }

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch(`${URL}?id=eq.${id}`, {
        headers: {
          apikey: APIKEY,
        },
      });
      const data = await response.json();
      setProduct(data[0] ?? null);
    }

    loadProduct();
  }, [id]);

  return (
    <main className="app">
      <h1 className="page-title">Update Product</h1>
      {!product ? (
        <p className="status-msg">Henter produkt fra Supabase...</p>
      ) : (
        <ProductForm onSubmit={handleSubmit} productToUpdate={product} />
      )}
    </main>
  );
}
