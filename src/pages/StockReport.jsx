import { useState } from "react";
import axios from "axios";

export default function StockReport() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({});
  const [productMap, setProductMap] = useState({});
  const [subVariantMap, setSubVariantMap] = useState({});

  async function load() {
    // 1️⃣ Load stock transactions
    const txRes = await axios.get(
      `/api/stock/report?from=${from}&to=${to}&page=1&limit=50`
    );

    setRows(txRes.data.transactions || []);
    setTotals(txRes.data);

    // 2️⃣ Load product list to resolve names
    const prodRes = await axios.get("/api/products?page=1&limit=100");

    const pMap = {};
    const svMap = {};

    (prodRes.data.data || []).forEach(p => {
      pMap[p.id] = p.product_name;

      p.sub_variants?.forEach(sv => {
        svMap[sv.id] = sv.sku;
      });
    });

    setProductMap(pMap);
    setSubVariantMap(svMap);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Stock Report</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={e => setFrom(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          onChange={e => setTo(e.target.value)}
        />

        <button
          type="button"
          onClick={load}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded"
        >
          Load
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Sub Variant (SKU)</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Quantity</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border p-2">
                {new Date(r.transaction_date).toLocaleString()}
              </td>

              <td className="border p-2 text-teal-600 font-semibold">
                {productMap[r.product_id] || "Unknown Product"}
              </td>

              <td className="border p-2 text-purple-600">
                {subVariantMap[r.sub_variant_id] || "Unknown SKU"}
              </td>

              <td className="border p-2 font-bold">
                <span
                  className={
                    r.transaction_type === "IN"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {r.transaction_type}
                </span>
              </td>

              <td className="border p-2 font-semibold">{r.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 bg-gray-50 p-4 rounded text-sm font-semibold">
        <p>Total In: {totals.total_in}</p>
        <p>Total Out: {totals.total_out}</p>
        <p>Net: {totals.net}</p>
      </div>
    </div>
  );
}
