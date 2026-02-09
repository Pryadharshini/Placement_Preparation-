import { useNavigate } from "react-router-dom";

const MockHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-10">
      
      <h1 className="text-4xl font-bold text-violet-400">
        🤖 Mock Interview
      </h1>

      <div className="flex gap-10">
        
        {/* PERSONAL */}
        <button
          onClick={() => navigate("/app/mock/personal")}
          className="bg-violet-600 px-8 py-4 rounded-xl text-xl hover:bg-violet-700"
        >
          🎤 Personal Interview
        </button>

        {/* GROUP */}
        <button
          onClick={() => navigate("/app/mock/group")}
          className="bg-green-600 px-8 py-4 rounded-xl text-xl hover:bg-green-700"
        >
          👥 Group Discussion
        </button>

      </div>
    </div>
  );
};

export default MockHome;
