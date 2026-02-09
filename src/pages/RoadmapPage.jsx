import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { roadmaps } from "../data/roadmaps";

const RoadmapPage = () => {
  const { slug } = useParams();
  const roadmap = roadmaps[slug];

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(`roadmap-${slug}`);
    if (saved) setCompleted(JSON.parse(saved));
  }, [slug]);

  useEffect(() => {
    localStorage.setItem(`roadmap-${slug}`, JSON.stringify(completed));
  }, [completed, slug]);

  const toggleStep = (index) => {
    setCompleted((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (!roadmap) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Roadmap not found
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#0c0717] via-[#120a2a] to-[#05010d] px-6">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-2">
            {roadmap.title}
          </h2>

          <p className="text-gray-400 mb-10">
            Click a step to mark it as completed
          </p>

          <div className="relative border-l border-purple-500/40 ml-4">
            {roadmap.steps.map((step, index) => {
              const done = completed.includes(index);

              return (
                <div
                  key={index}
                  onClick={() => toggleStep(index)}
                  className="mb-8 ml-8 relative cursor-pointer group"
                >
                  <span
                    className={`absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full
                      ${done ? "bg-green-500" : "bg-purple-500"}`}
                  />

                  <p
                    className={`font-medium
                      ${done ? "text-green-400 line-through" : "text-gray-200"}`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-sm text-gray-400">
            Progress:{" "}
            <span className="text-green-400 font-semibold">
              {completed.length}
            </span>{" "}
            / {roadmap.steps.length}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
