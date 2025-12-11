import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const dummyAssignedAssets = [
  {
    _id: "1",
    assetName: "Laptop Dell XPS 13",
    assetType: "Returnable",
    status: "assigned",
    assignedDate: "2025-12-01T10:00:00Z",
  },
  {
    _id: "2",
    assetName: "Office Chair Ergonomic",
    assetType: "Returnable",
    status: "assigned",
    assignedDate: "2025-11-25T14:30:00Z",
  },
  {
    _id: "3",
    assetName: "Mouse Logitech MX",
    assetType: "Returnable",
    status: "returned",
    assignedDate: "2025-11-20T09:15:00Z",
  },
];

const ReturnAssignedAssetsDummy = () => {
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setAssignedAssets(dummyAssignedAssets);
      setLoading(false);
    }, 1000);
  }, []);

  const handleReturn = (id) => {
    if (!window.confirm("Are you sure you want to return this asset?")) return;

    setReturningId(id);
    setTimeout(() => {
      setAssignedAssets((prev) =>
        prev.map((asset) =>
          asset._id === id ? { ...asset, status: "returned" } : asset
        )
      );
      setReturningId(null);
      alert("Asset returned successfully!");
    }, 800); 
  };

  if (loading) return <Loading></Loading>;

  if (!assignedAssets.length)
    return (
      <p className="text-center mt-6 text-gray-500">
        No assigned assets found.
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-4 text-indigo-600 text-center py-4">
        Assigned Assets
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-indigo-500">Name</th>
              <th className="px-4 py-2 text-left text-indigo-500">Type</th>
              <th className="px-4 py-2 text-left text-indigo-500">Status</th>
              <th className="px-4 py-2 text-left text-indigo-500">Assigned Date</th>
              <th className="px-4 py-2 text-left text-indigo-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedAssets.map((asset) => (
              <tr key={asset._id} className="border-t">
                <td className="px-4 py-2 text-indigo-500">{asset.assetName}</td>
                <td className="px-4 py-2 text-indigo-500">{asset.assetType}</td>
                <td className="px-4 py-2 text-indigo-500">
                  <span
                    className={`${
                      asset.status === "returned"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-medium"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-indigo-500">
                  {new Date(asset.assignedDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {asset.status !== "returned" && (
                    <button
                      onClick={() => handleReturn(asset._id)}
                      disabled={returningId === asset._id}
                      className={`px-3 py-1 rounded text-white font-semibold ${
                        returningId === asset._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {returningId === asset._id ? "Returning..." : "Return"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnAssignedAssetsDummy;
