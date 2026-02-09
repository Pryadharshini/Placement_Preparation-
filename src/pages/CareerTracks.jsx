import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const careerTracks = [
  {
    title: "Frontend Developer ",
    description: "HTML, CSS, JavaScript, React & real-world projects.",
    tag: "Most Popular",
    enrolled: "16.0k+ enrolled",
    rating: "4.9",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Backend Developer ",
    description: "Java, Spring Boot, REST APIs & databases.",
    tag: "Popular",
    enrolled: "13.1k+ enrolled",
    rating: "4.7",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Full Stack Developer ",
    description: "Frontend, Backend, deployment & system design.",
    tag: "Trending",
    enrolled: "10.4k+ enrolled",
    rating: "4.8",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Java Developer ",
    description: "Core Java, OOP, Collections & Spring Framework.",
    tag: "Recommended",
    enrolled: "9.2k+ enrolled",
    rating: "4.6",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Data Analyst ",
    description: "Excel, SQL, Python, Power BI & case studies.",
    tag: "New",
    enrolled: "6.7k+ enrolled",
    rating: "4.9",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Data Scientist ",
    description: "Python, statistics, ML & real datasets.",
    tag: "Advanced",
    enrolled: "5.3k+ enrolled",
    rating: "4.8",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    title: "Machine Learning Engineer ",
    description: "ML algorithms, model building & deployment.",
    tag: "Advanced",
    enrolled: "4.8k+ enrolled",
    rating: "4.7",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "DevOps Engineer ",
    description: "Linux, Docker, Kubernetes, CI/CD & AWS.",
    tag: "Hot",
    enrolled: "7.6k+ enrolled",
    rating: "4.6",
    gradient: "from-slate-500 to-gray-700",
  },
  {
    title: "Cloud Engineer ",
    description: "AWS, Azure, cloud services & architecture.",
    tag: "In Demand",
    enrolled: "6.1k+ enrolled",
    rating: "4.7",
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    title: "Android Developer ",
    description: "Kotlin, Android Studio & Play Store deployment.",
    tag: "Beginner Friendly",
    enrolled: "5.9k+ enrolled",
    rating: "4.5",
    gradient: "from-green-500 to-lime-500",
  },
  {
    title: "Cyber Security ",
    description: "Networking, ethical hacking & security tools.",
    tag: "High Salary",
    enrolled: "4.2k+ enrolled",
    rating: "4.8",
    gradient: "from-red-500 to-rose-600",
  },
  {
    title: "UI/UX Designer ",
    description: "Figma, UX principles & design systems.",
    tag: "Creative",
    enrolled: "3.9k+ enrolled",
    rating: "4.6",
    gradient: "from-purple-500 to-pink-500",
  },
];

const CareerTracks = () => {
  const navigate = useNavigate();

return (
  <div className="pt-28 min-h-screen bg-gradient-to-br from-[#0b061a] via-[#120a2a] to-[#05010d]">
    <div className="mx-auto max-w-7xl px-6 md:px-12">

      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Career Tracks
      </h1>
      <p className="text-gray-400 mt-2">
        Master the skills you need to advance your tech career
      </p>

      {/* CTA */}
      <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Ready to start learning?
          </h3>
          <p className="text-gray-400">
            Choose a roadmap and start your grind today 🚀
          </p>
        </div>

        <span
          onClick={() => navigate("/register")}
          className="mt-4 md:mt-0 text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
        >
          ✔ Enroll Free
        </span>
      </div>

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {careerTracks.map((track, index) => (
          <div
            key={index}
            className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            {/* Accent line */}
            <div className={`h-1 bg-gradient-to-r ${track.gradient}`} />

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg text-white leading-snug">
                {track.title}
              </h3>

              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                {track.description}
              </p>

              {/* Tags */}
<div className="mt-4 flex flex-col gap-2 text-xs">
  {/* First row */}
  <div className="flex flex-wrap gap-2">
    <span className="bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full">
      {track.tag}
    </span>

    <span className="bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full">
      {track.enrolled}
    </span>
  </div>

  {/* Second row – Rating */}
  <span className="inline-flex items-center gap-1 bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-full w-fit">
    <FaStar className="text-[11px]" />
    {track.rating}
  </span>
</div>


              <button
  onClick={() =>
  navigate(
    `/app/career-tracks/${track.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")}`
  )
}

  className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white py-2.5 rounded-lg font-semibold transition"
>
  ▶ Start Learning
</button>

            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

};

export default CareerTracks;
