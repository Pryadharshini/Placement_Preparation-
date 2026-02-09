import { useState } from "react";

const MockInterview = () => {
const [file, setFile] = useState(null);
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [feedback, setFeedback] = useState("");
const [loading, setLoading] = useState(false);
const [started, setStarted] = useState(false);

// start interview
const startInterview = async () => {
if (!file) return alert("Upload resume first");

```
const formData = new FormData();
formData.append("resume", file);

setLoading(true);

const res = await fetch("http://localhost:5000/api/ai/start-interview", {
  method: "POST",
  body: formData,
});

const data = await res.json();
setQuestion(data.question);
setStarted(true);
setLoading(false);
```

};

// submit answer
const submitAnswer = async () => {
if (!answer) return;

```
setLoading(true);

const res = await fetch("http://localhost:5000/api/ai/evaluate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question, answer }),
});

const data = await res.json();

setFeedback(data.feedback);
setQuestion(data.nextQuestion);
setAnswer("");
setLoading(false);
```

};

return ( <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

```
  {/* Title */}
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-violet-400">
      🤖 AI Mock Interview
    </h1>
    <p className="text-gray-400 mt-2">
      Practice interviews with real-time AI feedback
    </p>
  </div>

  {/* Upload section */}
  {!started && (
    <div className="flex flex-col items-center gap-6 bg-gray-900 border border-violet-600 p-10 rounded-2xl max-w-xl mx-auto shadow-2xl">
      
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="border border-violet-500 bg-black p-3 rounded w-full"
      />

      <button
        onClick={startInterview}
        className="bg-violet-600 hover:bg-violet-700 px-10 py-3 rounded-lg font-semibold shadow-lg transition"
      >
        {loading ? "Starting Interview..." : "Start AI Interview"}
      </button>
    </div>
  )}

  {/* Interview UI */}
  {started && (
    <div className="max-w-4xl mx-auto bg-gray-900 border border-violet-600 shadow-2xl rounded-2xl p-8 mt-8">
      
      <h2 className="text-xl font-semibold mb-4 text-violet-400">
        🎤 AI Question:
      </h2>

      <p className="bg-black border border-violet-500 p-4 rounded text-gray-200">
        {question}
      </p>

      <textarea
        placeholder="Type your answer here..."
        className="w-full border border-violet-500 bg-black mt-4 p-3 rounded text-white"
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button
        onClick={submitAnswer}
        className="mt-4 bg-violet-600 hover:bg-violet-700 px-8 py-2 rounded font-semibold"
      >
        {loading ? "Evaluating..." : "Submit Answer"}
      </button>

      {feedback && (
        <div className="mt-6 bg-black border border-green-500 p-5 rounded">
          <h3 className="font-bold text-green-400 mb-2">
            🧠 AI Feedback:
          </h3>
          <p className="text-gray-200 whitespace-pre-line">{feedback}</p>
        </div>
      )}
    </div>
  )}
</div>


);
};

export default MockInterview;
