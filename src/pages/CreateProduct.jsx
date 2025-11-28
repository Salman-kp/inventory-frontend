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

  // ---------------- VARIANTS ----------------
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

  // ---------------- SUB VARIANTS ----------------
  function addSubVariant() {
    setForm({
      ...form,
      sub_variants: [
        ...form.sub_variants,
        {
          sku: "",
          option_values: []
        }
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
    copy[i].option_values.push({
      variant_name: "",
      value: ""
    });
    setForm({ ...form, sub_variants: copy });
  }

  function updateSubOption(i, j, key, val) {
    const copy = [...form.sub_variants];
    copy[i].option_values[j][key] = val;
    setForm({ ...form, sub_variants: copy });
  }

  // ---------------- SUBMIT ----------------
  async function submit() {
    setError("");

    if (
      !form.product_id ||
      !form.product_code ||
      !form.product_name ||
      !form.created_user
    ) {
      alert("Required fields missing");
      return;
    }

    const payload = {
      ...form,
      product_id: Number(form.product_id) // ✅ BACKEND NEEDS INT64
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      await axios.post("/api/products", payload);
      alert("✅ Product created successfully");

      setForm({
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
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data);
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.details ||
        "Invalid request body"
      );
    }
  }

  return (
    <div className="max-w-4xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Product</h2>

      {/* BASIC FIELDS */}
      {[
        ["Product ID (number)", "product_id"],
        ["Product Code", "product_code"],
        ["Product Name", "product_name"],
        ["Product Image URL", "product_image"],
        ["Created User UUID", "created_user"],
        ["HSN Code", "hsn_code"]
      ].map(([label, key]) => (
        <input
          key={key}
          className="border p-2 w-full mb-2"
          placeholder={label}
          value={form[key]}
          onChange={e =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      {/* VARIANTS */}
      <h3 className="font-bold mt-4 mb-2">Variants</h3>
      <button
        type="button"
        onClick={addVariant}
        className="bg-blue-600 text-white px-3 py-1 rounded mb-3"
      >
        Add Variant
      </button>

      {form.variants.map((v, i) => (
        <div key={i} className="border p-3 mb-2">
          <input
            className="border p-2 w-full mb-2"
            placeholder="Variant Name (Color / Size)"
            value={v.name}
            onChange={e => updateVariantName(i, e.target.value)}
          />

          {v.options.map((opt, j) => (
            <input
              key={j}
              className="border p-2 w-full mb-2"
              placeholder={`Option ${j + 1}`}
              value={opt}
              onChange={e => updateOption(i, j, e.target.value)}
            />
          ))}

          <button
            type="button"
            onClick={() => addOption(i)}
            className="bg-gray-600 text-white px-2 py-1 rounded"
          >
            + Add Option
          </button>
        </div>
      ))}

      {/* SUB VARIANTS */}
      <h3 className="font-bold mt-4 mb-2">Sub Variants</h3>
      <button
        type="button"
        onClick={addSubVariant}
        className="bg-purple-600 text-white px-3 py-1 rounded mb-3"
      >
        Add Sub Variant
      </button>

      {form.sub_variants.map((sv, i) => (
        <div key={i} className="border p-3 mb-3">
          <input
            className="border p-2 w-full mb-2"
            placeholder="SKU"
            value={sv.sku}
            onChange={e => updateSubSKU(i, e.target.value)}
          />

          {sv.option_values.map((ov, j) => (
            <div key={j} className="flex gap-2 mb-2">
              <input
                className="border p-2 w-1/2"
                placeholder="Variant Name"
                value={ov.variant_name}
                onChange={e =>
                  updateSubOption(i, j, "variant_name", e.target.value)
                }
              />
              <input
                className="border p-2 w-1/2"
                placeholder="Value"
                value={ov.value}
                onChange={e =>
                  updateSubOption(i, j, "value", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => addSubOption(i)}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            + Add Sub Option
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
      >
        Save Product
      </button>

      {error && (
        <p className="text-red-600 mt-3 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}
