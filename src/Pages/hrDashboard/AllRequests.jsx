import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiSearch, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const AllRequests = () => {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // ---------- FETCH ALL HR REQUESTS ----------
  useEffect(() => {
    const fetchHRRequests = async () => {
      try {
                                const apiBase = import.meta.env.VITE_API_URL;

        const res = await axios.get(
          `${apiBase}/requests/hr`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load HR requests:", err);
        Swal.fire("Error", "Failed to load HR requests!", "error");
      }
    };

    fetchHRRequests();
  }, []);

  // ---------- HANDLE STATUS CHANGE ----------
  const handleStatus = async (id, status) => {
    const actionText = status === "approved" ? "Approve" : "Reject";
    const backendAction = status === "approved" ? "approve" : "reject"; // match backend route

    Swal.fire({
      title: `${actionText} Request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
                                          const apiBase = import.meta.env
                                            .VITE_API_URL;

          const res = await axios.patch(
            `${apiBase}/requests/${id}/${backendAction}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (res.data.success) {
            setRequests((prev) =>
              prev.map((r) =>
                r._id === id ? { ...r, requestStatus: status } : r
              )
            );
            Swal.fire("Success!", `Request ${status}ed.`, "success");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update request.", "error");
        }
      }
    });
  };

  // ---------- FILTER REQUESTS ----------
  const filteredRequests = requests.filter(
    (req) =>
      req.requesterName.toLowerCase().includes(search.toLowerCase()) ||
      req.assetName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500 py-4">
        All Asset Requests
      </h2>

      {/* Search */}
      <div className="mb-5 flex items-center gap-3 bg-white p-3 rounded-xl shadow-md w-full md:w-96 text-indigo-800">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search employee or asset..."
          className="w-full outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white mb-6">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm text-indigo-800">
              <th className="p-4">Employee</th>
              <th className="p-4">Asset</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr
                key={req._id}
                className="border-b hover:bg-gray-50 transition text-indigo-500"
              >
                <td className="p-4">{req.requesterName}</td>
                <td className="p-4">{req.assetName}</td>
                <td className="p-4">
                  {new Date(req.requestDate).toLocaleDateString()}
                </td>
                <td className="p-4 font-semibold">
                  {req.requestStatus === "pending" && (
                    <span className="text-yellow-600">Pending</span>
                  )}
                  {req.requestStatus === "approved" && (
                    <span className="text-green-600">Approved</span>
                  )}
                  {req.requestStatus === "rejected" && (
                    <span className="text-red-600">Rejected</span>
                  )}
                </td>
                <td className="p-4 flex items-center justify-center gap-3">
                  {req.requestStatus === "pending" ? (
                    <>
                      <button
                        onClick={() => handleStatus(req._id, "approved")}
                        className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                        title="Approve"
                      >
                        <FiCheckCircle size={22} />
                      </button>
                      <button
                        onClick={() => handleStatus(req._id, "rejected")}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                        title="Reject"
                      >
                        <FiXCircle size={22} />
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <p className="text-center py-6 text-gray-500">No requests found.</p>
        )}
      </div>

      {/* Home */}
      <div className="flex justify-center mt-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
        >
          <FiHome /> Go Home
        </button>
      </div>
    </div>
  );
};

export default AllRequests;
