import { useState } from "react";
import axios from "axios";

export default function StockOut() {
  const [productId, setProductId] = useState("");
  const [subVariantId, setSubVariantId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");

    if (!productId || !subVariantId || !quantity) {
      setError("All fields are required");
      return;
    }

    const payload = {
      product_id: productId,          // ✅ UUID STRING
      sub_variant_id: subVariantId,   // ✅ UUID STRING
      quantity: quantity              // ✅ MUST BE STRING
    };

    console.log("STOCK OUT PAYLOAD:", payload);

    try {
      await axios.post("/api/stock/out", payload);
      alert("✅ Stock Removed Successfully");

      setProductId("");
      setSubVariantId("");
      setQuantity("");
    } catch (err) {
      console.error("STOCK OUT ERROR:", err.response?.data);

      setError(
        err?.response?.data?.details ||
        err?.response?.data?.message ||
        "Failed to remove stock"
      );
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Stock Out</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Product UUID"
        value={productId}
        onChange={e => setProductId(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Sub Variant UUID"
        value={subVariantId}
        onChange={e => setSubVariantId(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Quantity (e.g. 2 )"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button
        type="button"
        onClick={submit}
        className="bg-red-600 text-white px-4 py-2 rounded w-full"
      >
        Remove Stock
      </button>

      {error && (
        <p className="text-red-600 mt-3 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}
