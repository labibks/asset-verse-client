import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";

const RequestAsset = () => {
  const [assets, setAssets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all assets
  const fetchAssets = async () => {
    try {
            const apiBase = import.meta.env.VITE_API_URL;

      const res = await axios.get(
        `${apiBase}/assets`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const assetsArray = Array.isArray(res.data.assets) ? res.data.assets : [];
      setAssets(assetsArray.filter((a) => a.availableQuantity > 0));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load assets!", "error");
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const openModal = (asset) => {
    setSelectedAsset(asset);
    setModalOpen(true);
    setNote("");
  };

  const submitRequest = async () => {
    if (!note) return Swal.fire("Error", "Please add a note!", "error");
    if (!selectedAsset) return;
    setLoading(true);

    try {
                  const apiBase = import.meta.env.VITE_API_URL;

      const res = await axios.post(
        `${apiBase}/requests`,
        { assetId: selectedAsset._id, note },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        Swal.fire("Success!", "Request submitted successfully!", "success");
        setModalOpen(false);
        setNote("");
      } else {
        Swal.fire("Error", res.data.error || "Request failed!", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Request submission failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">
        Request Assets
      </h2>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {assets.map((asset) => (
          <motion.div
            key={asset._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-indigo-500"
          >
            {asset.productImage ? (
              <img
                src={asset.productImage}
                alt={asset.productName}
                className="w-full h-40 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{asset.productName}</h3>
            <p>Type: {asset.productType}</p>
            <p>Company: {asset.companyName}</p>
            <p>Available Quantity: {asset.availableQuantity}</p>
            <button
              onClick={() => openModal(asset)}
              className="w-full py-2 mt-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Request Asset
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">
              Request {selectedAsset.productName}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitRequest();
              }}
            >
              <p className="text-indigo-500">
                Asset Name: {selectedAsset.productName}
              </p>
              <p className="text-indigo-500">
                Type: {selectedAsset.productType}
              </p>
              <p className="text-indigo-500">
                Company: {selectedAsset.companyName}
              </p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full border rounded p-2 mt-2 text-indigo-500"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
