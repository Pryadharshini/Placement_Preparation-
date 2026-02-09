import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { UploadCloud, FileText, Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyzeResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== "application/pdf") {
      setError("Upload only PDF file");
      return;
    }
    setFile(selected);
    setError("");
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload resume first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);
    formData.append("role", role);

    try {
      setLoading(true);
      setAnalysis("");
      setError("");

      const res = await axios.post("http://127.0.0.1:8000/analyze-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error(err);
      setError("Server error while analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(analysis, 180);
    doc.text(lines, 10, 10);
    doc.save("Resume_Analysis.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-violet-400 flex items-center gap-2">
            <Sparkles /> AI Resume Analyzer
          </h1>
          <p className="text-gray-400 mt-2">
            Upload resume and get smart AI feedback to improve and match jobs
          </p>
        </motion.div>

        {/* Card */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-gray-900 border border-violet-600 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UploadCloud /> Upload Resume
            </h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-violet-500 rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition">
              <FileText size={40} className="mb-2 text-violet-400" />
              <span className="text-sm text-gray-300">
                {file ? file.name : "Click to upload PDF"}
              </span>
              <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
            </label>

            <input
              type="text"
              placeholder="Enter Desired Role (Frontend, Python Dev...)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-4 p-3 rounded-lg bg-black border border-violet-500"
            />

            <textarea
              placeholder="Paste Job Description (optional)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full mt-4 p-3 rounded-lg bg-black border border-violet-500 h-32"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-4 bg-violet-600 hover:bg-violet-700 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {error && <p className="text-red-400 mt-3">{error}</p>}
          </div>

          {/* Result Section */}
          <div className="bg-gray-900 border border-violet-600 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>

            {!analysis && (
              <p className="text-gray-500 text-sm">
                Your AI analysis report will appear here...
              </p>
            )}

            {analysis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-black p-4 rounded-lg max-h-[350px] overflow-auto text-sm whitespace-pre-wrap">
                  {analysis}
                </div>

                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  <Download size={18} /> Download Report
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
