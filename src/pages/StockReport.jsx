import { useState } from "react";
import axios from "axios";

export default function StockReport() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({});

  async function load() {
    const res = await axios.get(`/api/stock/report?from=${from}&to=${to}&page=1&limit=20`);
    setRows(res.data.transactions || []);
    setTotals(res.data);
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Stock Report</h2>

      <div className="flex gap-3 mb-4">
        <input type="date" className="border p-2" onChange={e => setFrom(e.target.value)} />
        <input type="date" className="border p-2" onChange={e => setTo(e.target.value)} />
        <button type="button" onClick={load}
          className="bg-blue-600 text-white px-4 py-2 rounded">Load</button>
      </div>

      <table className="w-full border">
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td className="border p-2">{r.transaction_date}</td>
              <td className="border p-2">{r.transaction_type}</td>
              <td className="border p-2">{r.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <p>Total In: {totals.total_in}</p>
        <p>Total Out: {totals.total_out}</p>
        <p>Net: {totals.net}</p>
      </div>
    </div>
  );
}
