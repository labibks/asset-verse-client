import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";

const AddAsset = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddAsset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const quantity = Number(form.quantity.value);
    const imageFile = form.image.files[0];

    if (!imageFile) {
      Swal.fire("Error", "Please select an image!", "error");
      setLoading(false);
      return;
    }

    // 1️⃣ Upload image to imgbb
    const imgBB_API_KEY = "8c7d9637da2bc76621539d1f1045f05e";
    const formData = new FormData();
    formData.append("image", imageFile);

    let imageURL = "";

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBB_API_KEY}`,
        formData
      );
      imageURL = res.data.data.url;
    } catch (err) {
      Swal.fire("Error", "Image upload failed!", "error");
      setLoading(false);
      return;
    }

    // 2️⃣ Prepare asset object
    const newAsset = {
      productName: name,
      productType: type,
      productQuantity: quantity,
      availableQuantity: quantity,
      productImage: imageURL,
      companyName: "Company",
      dateAdded: new Date(),
    };

    // 3️⃣ Send to backend
    try {
                        const apiBase = import.meta.env.VITE_API_URL;

      const res = await axios.post(
        `${apiBase}/assets`,
        newAsset,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        Swal.fire("Success!", "Asset added successfully!", "success");
        form.reset();
        // 🔥 Navigate to AssetList correctly
        navigate("/dashboard/hr/asset-list", { replace: true });
      } else {
        Swal.fire("Error", res.data.error || "Failed to add asset!", "error");
      }
    } catch (err) {
      console.error("Add asset error:", err);
      Swal.fire("Error", "Add asset failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Add New Asset
      </h1>

      <form
        onSubmit={handleAddAsset}
        className="space-y-4 bg-white p-6 rounded-lg shadow-xl"
      >
        <div>
          <label className="font-semibold text-indigo-500">Product Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border px-4 py-2 rounded text-indigo-500"
          />
        </div>

        <div>
          <label className="font-semibold text-indigo-500">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full border px-4 py-2 rounded text-indigo-500"
          />
        </div>

        <div>
          <label className="font-semibold text-indigo-500">Product Type</label>
          <select
            name="type"
            required
            className="w-full border px-4 py-2 rounded text-indigo-500"
          >
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-indigo-500">Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            required
            className="w-full border px-4 py-2 rounded text-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold"
        >
          {loading ? "Adding..." : "Add Asset"}
        </button>
      </form>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/dashboard/hr/asset-list")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          <FaHome /> Go to Asset List
        </button>
      </div>
    </div>
  );
};

export default AddAsset;
