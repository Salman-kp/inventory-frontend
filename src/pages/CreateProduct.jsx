import { useState } from "react";
import axios from "axios";

export default function CreateProduct() {
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    product_id: "",
    product_code: "",
    product_name: "",
    product_image: "",
    created_user: "",
    is_favourite: false,
    active: true,
    hsn_code: "",
    variants: [],
    sub_variants: []
  });

  function addVariant() {
    setForm({
      ...form,
      variants: [...form.variants, { name: "", options: [""] }]
    });
  }

  function updateVariantName(i, val) {
    const copy = [...form.variants];
    copy[i].name = val;
    setForm({ ...form, variants: copy });
  }

  function addOption(i) {
    const copy = [...form.variants];
    copy[i].options.push("");
    setForm({ ...form, variants: copy });
  }

  function updateOption(i, j, val) {
    const copy = [...form.variants];
    copy[i].options[j] = val;
    setForm({ ...form, variants: copy });
  }

  function addSubVariant() {
    setForm({
      ...form,
      sub_variants: [
        ...form.sub_variants,
        { sku: "", option_values: [] }
      ]
    });
  }

  function updateSubSKU(i, val) {
    const copy = [...form.sub_variants];
    copy[i].sku = val;
    setForm({ ...form, sub_variants: copy });
  }

  function addSubOption(i) {
    const copy = [...form.sub_variants];
    copy[i].option_values.push({ variant_name: "", value: "" });
    setForm({ ...form, sub_variants: copy });
  }

  function updateSubOption(i, j, key, val) {
    const copy = [...form.sub_variants];
    copy[i].option_values[j][key] = val;
    setForm({ ...form, sub_variants: copy });
  }

  async function submit() {
    setError("");

    const payload = {
      ...form,
      product_id: Number(form.product_id)
    };

    try {
      await axios.post("/api/products", payload);
      alert("✅ Product created successfully");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.details ||
        "Invalid request body"
      );
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h2>

      <div className="grid grid-cols-2 gap-4">
        {[
          ["Product ID", "product_id"],
          ["Product Code", "product_code"],
          ["Product Name", "product_name"],
          ["Product Image URL", "product_image"],
          ["Created User UUID", "created_user"],
          ["HSN Code", "hsn_code"]
        ].map(([label, key]) => (
          <input
            key={key}
            className="border p-3 rounded focus:ring-2 focus:ring-teal-400 outline-none"
            placeholder={label}
            value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
      </div>

      <h3 className="font-semibold mt-8 mb-2 text-teal-700">Variants</h3>
      <button onClick={addVariant} className="bg-teal-600 text-white px-4 py-2 rounded mb-4">
        Add Variant
      </button>

      {form.variants.map((v, i) => (
        <div key={i} className="bg-gray-50 p-4 rounded mb-3">
          <input className="border p-2 w-full mb-2 rounded"
            placeholder="Variant Name"
            value={v.name}
            onChange={e => updateVariantName(i, e.target.value)} />

          {v.options.map((opt, j) => (
            <input key={j} className="border p-2 w-full mb-2 rounded"
              placeholder={`Option ${j + 1}`}
              value={opt}
              onChange={e => updateOption(i, j, e.target.value)} />
          ))}

          <button onClick={() => addOption(i)}
            className="text-sm bg-gray-700 text-white px-3 py-1 rounded">
            + Add Option
          </button>
        </div>
      ))}

      <h3 className="font-semibold mt-8 mb-2 text-purple-700">Sub Variants</h3>
      <button onClick={addSubVariant}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4">
        Add Sub Variant
      </button>

      {form.sub_variants.map((sv, i) => (
        <div key={i} className="bg-purple-50 p-4 rounded mb-3">
          <input className="border p-2 w-full mb-2 rounded"
            placeholder="SKU"
            value={sv.sku}
            onChange={e => updateSubSKU(i, e.target.value)} />

          {sv.option_values.map((ov, j) => (
            <div key={j} className="flex gap-2 mb-2">
              <input className="border p-2 w-1/2 rounded"
                placeholder="Variant"
                value={ov.variant_name}
                onChange={e => updateSubOption(i, j, "variant_name", e.target.value)} />
              <input className="border p-2 w-1/2 rounded"
                placeholder="Value"
                value={ov.value}
                onChange={e => updateSubOption(i, j, "value", e.target.value)} />
            </div>
          ))}

          <button onClick={() => addSubOption(i)}
            className="text-sm bg-purple-700 text-white px-3 py-1 rounded">
            + Add Sub Option
          </button>
        </div>
      ))}

      <button onClick={submit}
        className="bg-green-600 hover:bg-green-700 transition text-white py-3 rounded w-full mt-6 text-lg">
        Save Product
      </button>

      {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
    </div>
  );
}
