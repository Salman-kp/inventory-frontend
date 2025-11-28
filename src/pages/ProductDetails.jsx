import { useLocation, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <p>Product data not found. Please go back.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const optionMap = {};
  product.variants?.forEach(v => {
    v.options?.forEach(o => {
      optionMap[o.id] = `${v.name}: ${o.value}`;
    });
  });

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-teal-600 mb-4">
        {product.product_name}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <p><b>Product Code:</b> {product.product_code}</p>
        <p><b>HSN:</b> {product.hsn_code}</p>
        <p className="break-all"><b>Product UUID:</b> {product.id}</p>
        <p><b>Total Stock:</b> {product.total_stock}</p>
        <p><b>Active:</b> {String(product.active)}</p>
        <p><b>Favourite:</b> {String(product.is_favourite)}</p>
      </div>

      <h3 className="text-lg font-bold mb-2 text-gray-700">Variants</h3>
      {product.variants?.map(v => (
        <div key={v.id} className="border p-4 rounded mb-3 bg-gray-50">
          <p className="font-semibold">{v.name}</p>
          <ul className="list-disc ml-6 mt-2 text-sm">
            {v.options?.map(o => (
              <li key={o.id}>{o.value}</li>
            ))}
          </ul>
        </div>
      ))}


      <h3 className="text-lg font-bold mt-6 mb-2 text-gray-700">Sub Variants</h3>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Sub Variant UUID</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {product.sub_variants?.map(sv => (
            <tr key={sv.id}>
              <td className="border p-2">{sv.sku}</td>
              <td className="border p-2 text-green-600 break-all">{sv.id}</td>
              <td className="border p-2 font-semibold">{sv.stock}</td>

              <td className="border p-2 text-xs">
                {sv.option_ids?.map(id => optionMap[id]).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
