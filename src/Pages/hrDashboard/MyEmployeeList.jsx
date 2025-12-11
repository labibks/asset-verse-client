import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FiUsers, FiTrash2, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router";

const MyEmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [maxEmployees, setMaxEmployees] = useState(0);

  const token = localStorage.getItem("token"); // HR token

  // FETCH EMPLOYEES FROM BACKEND
  const fetchEmployees = async () => {
    try {
                  const apiBase = import.meta.env.VITE_API_URL;

      const res = await fetch(
        `${apiBase}/hr/employees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return Swal.fire("Error", data.error || "Failed to load data", "error");
      }

      // employees array
      const empList = data.employees || [];
      setEmployees(empList);

      // max employees (can fetch from HR subscription if backend sends)
      setMaxEmployees(data.currentEmployees || empList.length);
    } catch (error) {
      console.error("Fetch employees error:", error);
      Swal.fire("Error", "Unable to load employees", "error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ---------------------------
  // REMOVE EMPLOYEE
  // ---------------------------
  const handleRemove = (email) => {
    Swal.fire({
      title: "Remove Employee?",
      text: "This will remove this employee from your company.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
                            const apiBase = import.meta.env.VITE_API_URL;

          const res = await fetch(
            `${apiBase}/hr/employees/${email}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();

          if (!res.ok) {
            return Swal.fire(
              "Error",
              data.error || "Failed to remove",
              "error"
            );
          }

          // update frontend
          setEmployees((prev) =>
            prev.filter((emp) => emp.employeeEmail !== email)
          );

          Swal.fire("Removed!", "Employee removed successfully.", "success");
        } catch (error) {
          console.error("Remove error:", error);
          Swal.fire("Error", "Failed to remove employee", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 flex flex-col min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-indigo-500 text-center py-4">
            My Employees
          </h2>
          <p className="text-gray-500 text-center">
            <span className="font-semibold text-blue-600">
              {employees.length}
            </span>{" "}
            / {maxEmployees} employees used
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
          <FiUsers size={20} />
          <span className="font-medium">Team Overview</span>
        </div>
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {employees.map((emp) => (
          <div
            key={emp.employeeEmail}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            {/* Photo */}
            <div className="flex justify-center">
              <img
                src={emp.photo || "https://i.pravatar.cc/150"}
                alt={emp.employeeName}
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
            </div>

            {/* INFO */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-indigo-500">
                {emp.employeeName}
              </h3>
              <p className="text-gray-500 text-sm">{emp.employeeEmail}</p>

              <div className="mt-3 text-sm text-gray-600">
                <p>
                  Joined:{" "}
                  {emp.joinDate
                    ? new Date(emp.joinDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  Assets Assigned:{" "}
                  <span className="text-blue-600 font-bold">
                    {emp.assignedAssets || 0}
                  </span>
                </p>
              </div>
            </div>

            {/* REMOVE BUTTON */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => handleRemove(emp.employeeEmail)}
                className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition shadow-sm"
              >
                <FiTrash2 size={18} />
                Remove from Team
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {employees.length === 0 && (
        <div className="text-center mt-10 text-gray-500 text-xl">
          No employees found.
        </div>
      )}

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

export default MyEmployeeList;
