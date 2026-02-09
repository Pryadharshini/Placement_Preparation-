import React from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Search,
  Rocket,
  Calendar,
  ClipboardList,
  BookOpen,
  Sparkles,
  ListTodo,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    title: "Learn DSA",
    description: "Enhance your skills with personalized learning paths",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    title: "Resume Analyser",
    description: "Get instant feedback on your resume and improve ATS score",
  },
  {
    icon: <ListTodo className="w-6 h-6 text-purple-400" />,
    title: "Interactive TO-DO",
    description: "Capture ideas on the go, online or offline",
  },
  {
    icon: <Lock className="w-6 h-6 text-purple-400" />,
    title: "Unlock Dream Jobs",
    description: "Get personalized job recommendations based on your skills",
  },
  {
    icon: <Calendar className="w-6 h-6 text-purple-400" />,
    title: "Personalized Planner",
    description: "Stay organized with a performance-based planner",
  },
  {
    icon: <Rocket className="w-6 h-6 text-purple-400" />,
    title: "Mock Interviews",
    description: "AI-driven interview analysis with full reports",
  },
  {
    icon: <ClipboardList className="w-6 h-6 text-purple-400" />,
    title: "Course Recommendations",
    description: "Personalized courses based on your skills",
  },
  {
    icon: <Search className="w-6 h-6 text-purple-400" />,
    title: "Frictionless Search",
    description: "Easily recall and index past notes and ideas",
  },
];

export default function FeaturesPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b0614] to-[#07040d] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-400">
          Powerful Features
        </h2>
        <p className="mt-4 text-gray-400 text-lg">
          Everything you need to supercharge your career development
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative bg-[#120b1f] rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 border border-white/5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-lg bg-purple-500/10">
              {feature.icon}
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
