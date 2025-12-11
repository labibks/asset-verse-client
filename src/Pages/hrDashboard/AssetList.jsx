import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [editAsset, setEditAsset] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL;
      const res = await fetch(
        `${apiBase}/assets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch assets");

      const data = await res.json();

      const safeArray = Array.isArray(data)
        ? data
        : Array.isArray(data.assets)
        ? data.assets
        : Array.isArray(data.data)
        ? data.data
        : [];

      setAssets(safeArray);
    } catch (err) {
      console.error("Fetch assets error:", err);
      toast.error("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Delete asset
  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this asset?");
    if (!ok) return;

    try {
            const apiBase = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${apiBase}/assets/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Asset deleted successfully");
        setAssets((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed");
    }
  };

  // Open edit modal
  const handleEdit = (asset) => {
    setEditAsset(asset);
    setModalOpen(true);
  };

  const handleModalChange = (e) => {
    setEditAsset({ ...editAsset, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyToSend = {
        productName: editAsset.productName,
        productType: editAsset.productType,
        availableQuantity: parseInt(editAsset.availableQuantity),
        productImage: editAsset.productImage,
      };
            const apiBase = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${apiBase}/assets/${editAsset._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(bodyToSend),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Asset updated successfully");
        setAssets((prev) =>
          prev.map((item) =>
            item._id === editAsset._id ? { ...item, ...bodyToSend } : item
          )
        );
        setModalOpen(false);
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed");
    }
  };

  // Filter assets
  const filteredAssets = assets.filter((asset) =>
    asset?.productName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading></Loading>

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center py-3.5">
        All Company Assets
      </h1>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search assets..."
          className="border px-4 py-2 rounded w-72 shadow focus:ring focus:ring-indigo-300"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg flex-1">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    <img
                      src={asset.productImage || ""}
                      alt={asset.productName || "No Name"}
                      className="w-14 h-14 object-cover rounded text-indigo-500"
                    />
                  </td>

                  <td className="p-3 font-semibold text-indigo-500">
                    {asset.productName || "N/A"}
                  </td>
                  <td className="p-3 text-indigo-500">
                    {asset.productType || "N/A"}
                  </td>

                  <td className="p-3 text-indigo-500">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        asset.availableQuantity > 0
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {asset.availableQuantity || 0}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500">
                    {asset.dateAdded
                      ? new Date(asset.dateAdded).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(asset)}
                      className="text-blue-600 text-xl"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="text-red-600 text-xl"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          <FaHome /> Go Home
        </button>

        <button
          onClick={() => navigate("/dashboard/hr/add-asset")}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Add New Asset
        </button>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold">Edit Asset</h2>

            <form onSubmit={handleModalSubmit} className="space-y-3 mt-3">
              <input
                name="productName"
                value={editAsset.productName}
                onChange={handleModalChange}
                className="w-full border px-3 py-2 rounded text-indigo-500"
              />

              <input
                name="productType"
                value={editAsset.productType}
                onChange={handleModalChange}
                className="w-full border px-3 py-2 rounded text-indigo-500"
              />

              <input
                name="availableQuantity"
                type="number"
                value={editAsset.availableQuantity}
                onChange={handleModalChange}
                className="w-full border px-3 py-2 rounded text-indigo-500"
              />

              <input
                name="productImage"
                value={editAsset.productImage}
                onChange={handleModalChange}
                className="w-full border px-3 py-2 rounded text-indigo-500"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded text-indigo-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
