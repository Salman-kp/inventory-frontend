import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await axios.get("/api/products?page=1&limit=10");
    setProducts(res.data.data || []);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`, { state: product })}
            className="bg-white rounded-xl shadow p-6 border border-gray-200 cursor-pointer hover:shadow-xl transition"
          >
            <h3 className="text-lg font-bold text-teal-600">
              {product.product_name}
            </h3>

            <p className="text-sm text-gray-600">Code: {product.product_code}</p>
            <p className="text-xs text-blue-600 break-all mt-1">
              UUID: {product.id}
            </p>

            <p className="mt-2 font-semibold">
              Total Stock: {product.total_stock}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Click to view full details →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
