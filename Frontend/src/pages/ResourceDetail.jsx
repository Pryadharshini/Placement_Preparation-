import { useParams } from "react-router-dom";
import { resourceContent } from "@/data/resourceContent";

const ResourceDetail = () => {
  const { topic } = useParams();
  const data = resourceContent[topic];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        ❌ Resource not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b061f] text-white p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-400">
          {data.title}
        </h1>

        {data.w3link && (
          <button
            onClick={() =>
              window.open(data.w3link, "_blank", "noopener,noreferrer")
            }
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
          >
            Open W3Schools
          </button>
        )}
      </div>

      {/* Sections */}
      {data.sections.map((section, index) => (
        <div
          key={index}
          className="bg-white/10 p-6 rounded-xl mb-6"
        >
          <h2 className="text-2xl font-semibold mb-3">
            {section.heading}
          </h2>

          <pre className="whitespace-pre-wrap text-gray-300 mb-4">
            {section.content}
          </pre>

          {section.code && (
            <pre className="bg-black/60 p-4 rounded-lg text-green-400 overflow-x-auto">
              {section.code}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResourceDetail;
