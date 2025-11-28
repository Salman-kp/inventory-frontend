import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await axios.get("/api/products?page=1&limit=10");
    setProducts(res.data.data || []);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>

      {products.map(product => (
        <div key={product.id} className="bg-white p-4 mb-6 border rounded">
          
          {/* ✅ PRODUCT LEVEL INFO */}
          <p><b>Product Name:</b> {product.product_name}</p>
          <p><b>Product Code:</b> {product.product_code}</p>
          <p className="text-blue-600"><b>Product UUID:</b> {product.id}</p>
          <p><b>Total Stock:</b> {product.total_stock}</p>

          {/* ✅ SUB VARIANTS TABLE */}
          <table className="w-full border mt-3">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">SKU</th>
                <th className="border p-2">Sub Variant UUID</th>
                <th className="border p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {product.sub_variants?.map(sv => (
                <tr key={sv.id}>
                  <td className="border p-2">{sv.sku}</td>
                  <td className="border p-2 text-green-600">{sv.id}</td>
                  <td className="border p-2">{sv.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      ))}
    </div>
  );
}
