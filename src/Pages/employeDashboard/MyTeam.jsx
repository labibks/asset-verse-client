import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

// Dummy team data
const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Developer",
    avatar: "",
    company: "Company A",
    dob: "1990-12-10",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@company.com",
    role: "Designer",
    avatar: "",
    company: "Company B",
    dob: "1992-12-18",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@company.com",
    role: "QA Tester",
    avatar: "",
    company: "Company A",
    dob: "1991-11-25",
  },
];

const MyTeam = () => {
  const [team, setTeam] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("All");
  const navigate = useNavigate();

  useEffect(() => setTeam(teamMembers), []);

  const companies = ["All", ...new Set(teamMembers.map((m) => m.company))];

  const filteredTeam =
    selectedCompany === "All"
      ? team
      : team.filter((member) => member.company === selectedCompany);

  // Upcoming birthdays this month
  const currentMonth = new Date().getMonth() + 1;
  const upcomingBirthdays = team.filter(
    (m) => new Date(m.dob).getMonth() + 1 === currentMonth
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center py-4">
        My Team
      </h2>

      {/* Company Dropdown */}
      <div className="mb-6 w-full max-w-xs">
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-800"
        >
          {companies.map((company, idx) => (
            <option key={idx} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Team Members */}
      {filteredTeam.length === 0 ? (
        <p className="text-gray-600 text-center">No team members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredTeam.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-indigo-500"
            >
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
              ) : (
                <FaUserCircle className="w-20 h-20 text-gray-400 mb-4" />
              )}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-gray-500 text-sm mt-1">{member.email}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="mt-10 w-full max-w-3xl">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            Upcoming Birthdays (
            {new Date().toLocaleString("default", { month: "long" })})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingBirthdays.map((member) => (
              <div
                key={member.id}
                className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-gray-400" />
                )}
                <div>
                  <p className="font-semibold text-indigo-800">{member.name}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(member.dob).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Home Page Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotateY: 10 }}
        whileTap={{ scale: 0.95, rotateY: -10 }}
        onClick={() => navigate("/")}
        className="mt-10 px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Go to Home
      </motion.button>
    </div>
  );
};

export default MyTeam;
