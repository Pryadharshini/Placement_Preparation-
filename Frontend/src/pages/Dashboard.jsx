import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [resumeScore, setResumeScore] = useState(0);

  // 🔥 GET USER DATA FROM LOCALSTORAGE
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserName(user.name || "User");
      setResumeScore(user.resumeScore || 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 px-6 text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          👋 Welcome back, {userName}
        </h1>
        <p className="text-gray-400 mt-1">
          Track your placement journey & improve daily 🚀
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Resume Score" value={`${resumeScore}%`} color="from-pink-500 to-purple-600" />
        <StatCard title="Interviews Given" value="5" color="from-blue-500 to-indigo-600" />
        <StatCard title="Interview Score" value="74%" color="from-green-500 to-emerald-600" />
        <StatCard title="Courses Done" value="3" color="from-orange-500 to-red-500" />
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* AI INTERVIEW CARD */}
        <div className="md:col-span-2 bg-gradient-to-br from-purple-700 to-indigo-700 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-2">🤖 AI Mock Interview</h2>
          <p className="text-purple-100">
            Improve confidence with real-time AI interviews.
          </p>

          <div className="flex items-center justify-between mt-5">
            <p className="text-lg">
              Last Score: <span className="font-bold text-yellow-300">74%</span>
            </p>

            <button className="bg-white text-purple-700 px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Start Interview
            </button>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-[#111827] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">👤 Profile</h2>
          <p className="text-gray-400 mb-2">Complete profile to get jobs faster</p>

          <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
            <div className="bg-green-500 h-3 rounded-full w-[70%]"></div>
          </div>

          <p className="text-sm text-gray-400 mb-4">70% completed</p>

          <button className="bg-green-600 w-full py-2 rounded-lg hover:bg-green-700">
            Complete Profile
          </button>
        </div>
      </div>

      {/* TASKS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="bg-[#111827] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">✅ Today's Tasks</h2>

          <ul className="space-y-3 text-gray-300">
            <li className="bg-[#1f2937] p-3 rounded-lg">📄 Update Resume</li>
            <li className="bg-[#1f2937] p-3 rounded-lg">💻 Solve 2 DSA Problems</li>
            <li className="bg-[#1f2937] p-3 rounded-lg">🎙️ Mock Interview</li>
            <li className="bg-[#1f2937] p-3 rounded-lg">🚀 Apply for 3 Jobs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value, color }) {
  return (
    <div className={`bg-gradient-to-r ${color} p-5 rounded-2xl shadow-lg`}>
      <h3 className="text-sm text-white/80">{title}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
