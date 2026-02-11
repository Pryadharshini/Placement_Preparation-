import { useState, useEffect } from "react";

export default function ResumePage() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("resume");
    if (saved) setResume(saved);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Upload only PDF");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File too large (max 2MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("resume", reader.result);
      setResume(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 px-6">

      {/* TITLE + BUTTON ROW */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">My Resume</h1>

        {/* Upload button OUTSIDE */}
        <label className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 rounded-lg cursor-pointer">
          Upload Resume
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* NO RESUME */}
      {!resume && (
        <div className="flex justify-center mt-20">
          <div className="bg-white text-black p-10 rounded-xl text-center shadow-lg">
            <p className="font-semibold mb-3">No resume uploaded</p>
            <p className="text-gray-500">Upload resume to preview here</p>
          </div>
        </div>
      )}

      {/* RESUME VIEW */}
      {resume && (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">

          {/* Clean preview (no ugly toolbar) */}
          <iframe
            src={`${resume}#toolbar=0`}
            title="resume"
            className="w-full h-[85vh]"
          />
        </div>
      )}
    </div>
  );
}
