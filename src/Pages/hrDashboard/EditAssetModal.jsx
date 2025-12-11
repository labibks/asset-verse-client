import React, { useState } from "react";
import toast from "react-hot-toast";

const EditAssetModal = ({ asset, onClose, onUpdated, token }) => {
  const [formData, setFormData] = useState({
    productName: asset.productName,
    productType: asset.productType,
    productQuantity: asset.productQuantity,
    availableQuantity: asset.availableQuantity,
    productImage: asset.productImage,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("Quantity") ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/assets/${asset._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      toast.success("Asset updated successfully");
      onUpdated(); 
      onClose();
    } catch (err) {
      console.error("Edit asset error:", err);
      toast.error("Failed to update asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">Edit Asset</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Asset Name"
            className="border px-3 py-2 rounded focus:ring focus:ring-indigo-300"
            required
          />

          <input
            type="text"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            placeholder="Asset Type"
            className="border px-3 py-2 rounded focus:ring focus:ring-indigo-300"
            required
          />

          <input
            type="number"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
            placeholder="Total Quantity"
            className="border px-3 py-2 rounded focus:ring focus:ring-indigo-300"
            required
          />

          <input
            type="number"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            placeholder="Available Quantity"
            className="border px-3 py-2 rounded focus:ring focus:ring-indigo-300"
            required
          />

          <input
            type="text"
            name="productImage"
            value={formData.productImage}
            onChange={handleChange}
            placeholder="Image URL"
            className="border px-3 py-2 rounded focus:ring focus:ring-indigo-300"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetModal;
