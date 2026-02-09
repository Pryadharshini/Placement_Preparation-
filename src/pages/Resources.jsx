import { useNavigate } from "react-router-dom";

const resources = [
  {
    title: "Programming",
    items: [
      { name: "Java", slug: "java" },
      { name: "Python", slug: "python" },
      { name: "C / C++", slug: "cpp" },
      { name: "JavaScript", slug: "javascript" },
      { name: "SQL", slug: "sql" },
    ],
  },
  {
    title: "Web Development",
    items: [
      { name: "HTML & CSS", slug: "html-css" },
      { name: "React", slug: "react" },
      { name: "Node.js", slug: "node" },
      { name: "Express.js", slug: "express" },
      { name: "REST APIs", slug: "api" },
    ],
  },
  {
    title: "CS Core Subjects",
    items: [
      { name: "DSA", slug: "dsa" },
      { name: "DBMS", slug: "dbms" },
      { name: "Operating Systems", slug: "os" },
      { name: "Computer Networks", slug: "cn" },
      { name: "OOP Concepts", slug: "oops" },
    ],
  },
  {
    title: "Placement Prep",
    items: [
      { name: "Aptitude", slug: "aptitude" },
      { name: "Logical Reasoning", slug: "reasoning" },
      { name: "Verbal Ability", slug: "verbal" },
      { name: "Interview Q&A", slug: "interview" },
      { name: "Resume Building", slug: "resume" },
    ],
  },
  {
    title: "Tools & DevOps",
    items: [
      { name: "Git & GitHub", slug: "git" },
      { name: "Docker Basics", slug: "docker" },
      { name: "Linux Commands", slug: "linux" },
      { name: "System Design", slug: "system-design" },
    ],
  },
];

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b061f] via-[#0f0a2a] to-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        📚 Learning Resources
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((section, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">
              {section.title}
            </h2>

            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-black/30 px-4 py-2 rounded-lg"
                >
                  <span>{item.name}</span>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-sm bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md"
                  >
                    Start
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
