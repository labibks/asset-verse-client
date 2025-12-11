import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { auth as firebaseAuth } from "../../firebase/firebase.config";
import { getIdToken } from "firebase/auth";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router";

const UpgradePackage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [selectedPkg, setSelectedPkg] = useState(null);

  const API_BASE =
    import.meta.env.VITE_API_BASE ||
    "https://asset-verse-server-theta.vercel.app";

  // Helper: get auth headers
  async function getAuthHeader() {
    const backendToken = localStorage.getItem("backend_token");
    if (backendToken) return { Authorization: `Bearer ${backendToken}` };

    try {
      const current = firebaseAuth.currentUser;
      if (current) {
        const idToken = await getIdToken(current);
        return { Authorization: `Bearer ${idToken}` };
      }
    } catch (err) {
      console.warn("Could not get Firebase ID token:", err);
    }
    return {};
  }

  // Fetch packages
  const fetchPackages = async () => {
    try {
      const headers = await getAuthHeader();
      const res = await axios.get(`${API_BASE}/packages`, { headers });
      const data = Array.isArray(res.data.packages) ? res.data.packages : [];
      setPackages(data);
    } catch (err) {
      console.error("Failed to fetch packages:", err);
      Swal.fire("Error", "Failed to load packages.", "error");
      setPackages([]);
    }
  };

  // Fetch payment history
  const fetchPayments = async () => {
    try {
      const headers = await getAuthHeader();
      const res = await axios.get(`${API_BASE}/payments`, { headers });
      const data = Array.isArray(res.data.payments) ? res.data.payments : [];
      setPayments(data);
    } catch (err) {
      console.warn("Failed to fetch payments:", err);
      setPayments([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPackages();
      fetchPayments();
    }
  }, [user]);

  // Handle package selection
  const handleChoose = (pkg) => {
    setSelectedPkg(pkg);
    Swal.fire({
      title: `Upgrade to ${pkg.name}?`,
      html: `<p>Price: $${pkg.price} / month<br/>Employee limit: ${pkg.employeeLimit}</p>`,
      showCancelButton: true,
      confirmButtonText: "Proceed to Pay",
    }).then((result) => {
      if (result.isConfirmed) {
        createCheckoutSession(pkg._id);
      }
    });
  };

  // Create checkout session
  const createCheckoutSession = async (packageId) => {
    setLoading(true);
    try {
      const headers = await getAuthHeader();
      const res = await axios.post(
        `${API_BASE}/create-checkout-session`,
        { packageId },
        { headers }
      );

      const checkoutUrl = res.data?.url;
      if (!checkoutUrl) throw new Error("No checkout URL returned");

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      Swal.fire(
        "Payment Error",
        err.response?.data?.error || err.message || "Failed to start checkout",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center pr-4">
        Upgrade Package
      </h2>

      {/* Packages List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <motion.div
              key={pkg._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{pkg.name}</h3>
                <span className="text-indigo-600 font-bold">
                  ${pkg.price}/mo
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                <strong>{pkg.employeeLimit}</strong> employees allowed
              </p>

              <ul className="mb-4 text-gray-700 space-y-1">
                {(pkg.features || []).map((f, i) => (
                  <li key={i} className="text-sm">
                    • {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoose(pkg)}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
              >
                {loading ? "Processing..." : "Upgrade / Choose"}
              </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-6 bg-white rounded shadow text-indigo-500">
            No packages found.
          </div>
        )}
      </div>

      {/* Payment history */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment History
        </h3>

        {payments.length > 0 ? (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Amount (USD)</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id || p.transactionId} className="border-t">
                    <td className="px-4 py-3 text-sm">
                      {new Date(p.paymentDate || p.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {p.packageName || p.packageId}
                    </td>
                    <td className="px-4 py-3 text-sm">{p.amount}</td>
                    <td className="px-4 py-3 text-sm break-all">
                      {p.transactionId}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={
                          p.status === "completed"
                            ? "text-green-600 font-semibold"
                            : "text-gray-600"
                        }
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-6 rounded shadow text-indigo-500">
            No payments yet.
          </div>
        )}
      </div>

      {/* HOME BUTTON */}
      <div className="flex justify-center mt-10">
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

export default UpgradePackage;
