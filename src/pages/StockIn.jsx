import { useState } from "react";
import axios from "axios";

export default function StockIn() {
  const [productId, setProductId] = useState("");
  const [subVariantId, setSubVariantId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");

    if (!productId || !subVariantId || !quantity) {
      alert("All fields required");
      return;
    }

    const payload = {
      product_id: productId,
      sub_variant_id: subVariantId,
      quantity: quantity
    };

    try {
      await axios.post("/api/stock/in", payload);
      alert("Stock Added");
      setProductId(""); setSubVariantId(""); setQuantity("");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid request");
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-teal-600">Stock In</h2>

      <input className="border p-2 w-full mb-2 rounded" placeholder="Product UUID"
        value={productId} onChange={e => setProductId(e.target.value)} />

      <input className="border p-2 w-full mb-2 rounded" placeholder="Sub Variant UUID"
        value={subVariantId} onChange={e => setSubVariantId(e.target.value)} />

      <input className="border p-2 w-full mb-3 rounded" placeholder="Quantity"
        value={quantity} onChange={e => setQuantity(e.target.value)} />

      <button type="button" onClick={submit}
        className="bg-teal-600 hover:bg-teal-700 transition text-white px-4 py-2 rounded w-full">
        Add Stock
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
