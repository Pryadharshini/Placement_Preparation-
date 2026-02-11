import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { FaFileAlt, FaChartLine } from "react-icons/fa";

export default function ResumeAnalyzer() {
  const [userName, setUserName] = useState("User");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name || "User");
      setScore(user.resumeScore || 0);
    }
  }, []);

  const insights = [
    { skill: "React", score: 90 },
    { skill: "JavaScript", score: 85 },
    { skill: "CSS", score: 80 },
    { skill: "Testing", score: 75 },
    { skill: "Communication", score: 70 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0812] text-white flex flex-col items-center justify-center px-6 py-10">

      {/* HEADER */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Resume Analysis Dashboard
      </motion.h1>

      {/* ATS SCORE */}
      <motion.div
        className="bg-gradient-to-br from-[#1c1a2e] to-[#101017] rounded-3xl p-6 shadow-xl border border-[#2b2b40] w-full max-w-md text-center mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex justify-center mb-4 text-pink-500 text-2xl">
          <FaFileAlt />
        </div>

        <h2 className="text-xl font-semibold mb-2">{userName}</h2>
        <p className="text-gray-400 mb-4">ATS Resume Score</p>

        <div className="text-6xl font-bold text-pink-500">{score}%</div>
        <p className="mt-2 text-sm text-gray-400">ATS Compatibility Score</p>
      </motion.div>

      {/* RADAR */}
      <motion.div
        className="w-full max-w-4xl bg-[#1e1b2e] rounded-2xl p-6 border border-[#2d2d44] shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 mb-4 text-pink-400 text-xl">
          <FaChartLine />
          <span>Skill Analysis</span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={insights}>
            <PolarGrid stroke="#444" />
            <PolarAngleAxis dataKey="skill" stroke="#aaa" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar dataKey="score" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
