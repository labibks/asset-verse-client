import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MyAssets = () => {
  const [requests, setRequests] = useState([]);
  const [editNote, setEditNote] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // ---------- FETCH USER REQUESTS ----------
  const fetchRequests = async () => {
    const apiBase = import.meta.env.VITE_API_URL;

    try {
      const res = await axios.get(
        `${apiBase}/requests`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // ensure array
      if (Array.isArray(res.data)) setRequests(res.data);
      else setRequests([]);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load requests", "error");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ---------- SEARCH + FILTER ----------
  const filteredRequests = Array.isArray(requests)
    ? requests.filter((req) => {
        const matchesSearch = req.assetName
          ? req.assetName.toLowerCase().includes(search.toLowerCase())
          : false;
        const matchesFilter =
          filterStatus === "All" ||
          (req.requestStatus &&
            req.requestStatus.toLowerCase() === filterStatus.toLowerCase());
        return matchesSearch && matchesFilter;
      })
    : [];

  // ---------- UPDATE REQUEST ----------
  const updateRequest = async (id) => {
    if (!editNote.trim())
      return Swal.fire("Error", "Note cannot be empty", "error");

    try {
      const apiBase = import.meta.env.VITE_API_URL;
      const res = await axios.put(
        `${apiBase}/requests/${id}`,
        { note: editNote },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        Swal.fire("Success!", "Request updated", "success");
        setSelectedRequest(null);
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, note: editNote } : r))
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.error || "Update failed", "error");
    }
  };

  // ---------- DELETE REQUEST ----------
  const deleteRequest = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You cannot undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const apiBase = import.meta.env.VITE_API_URL;

      const res = await axios.delete(
        `${apiBase}/requests/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        Swal.fire("Deleted!", "Request deleted", "success");
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // ---------- PRINT ----------
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center py-4">
        My Assets
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mb-6">
        <input
          type="text"
          placeholder="Search by Asset Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-800"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-800"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Print
        </button>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">Asset</th>
              <th className="p-3">Note</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr
                key={req._id}
                className="border-b hover:bg-gray-100 text-indigo-500"
              >
                <td className="p-3">{req.assetName || "N/A"}</td>
                <td className="p-3">
                  {selectedRequest?._id === req._id ? (
                    <input
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      className="border p-1 rounded w-full text-indigo-500"
                    />
                  ) : (
                    req.note
                  )}
                </td>
                <td className="p-3 font-semibold">
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
                <td className="p-3 flex gap-2 text-indigo-500">
                  {req.requestStatus === "pending" ? (
                    <>
                      {selectedRequest?._id === req._id ? (
                        <button
                          onClick={() => updateRequest(req._id)}
                          className="text-green-600 font-semibold"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setEditNote(req.note);
                          }}
                          className="text-blue-600 font-semibold"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteRequest(req._id)}
                        className="text-red-600 font-semibold"
                      >
                        Delete
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
      )}
    </div>
  );
};

export default MyAssets;
