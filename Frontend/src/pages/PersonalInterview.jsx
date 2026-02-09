import { useState } from "react";

const MockInterview = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [listening, setListening] = useState(false);

  // 🎤 SPEECH RECOGNITION SETUP
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
  }

  // 🔊 AI SPEAK FUNCTION
  const speak = (text, autoListen = false) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;

    speech.onend = () => {
      if (autoListen) startListening();
    };

    window.speechSynthesis.speak(speech);
  };

  // 🎤 START LISTENING
  const startListening = () => {
    if (!recognition) {
      alert("Speech Recognition not supported. Use Chrome.");
      return;
    }

    setAnswer("");
    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswer(transcript);
    };

    recognition.onerror = (e) => {
      console.error("Mic error", e);
      setListening(false);
    };
  };

  // 🛑 STOP LISTENING + SEND ANSWER
  const stopListening = () => {
    if (recognition) recognition.stop();
    setListening(false);
    submitAnswer();
  };

  // ================= START INTERVIEW =================
  const startInterview = async () => {
    if (!file) return alert("Upload resume first");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      const res = await fetch(
        "http://127.0.0.1:8000/api/ai/start-interview",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setQuestion(data.question);
      setStarted(true);
      setLoading(false);

      // 🔊 speak + auto mic start
      speak(data.question, true);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
      setLoading(false);
    }
  };

  // ================= SUBMIT ANSWER =================
  const submitAnswer = async () => {
    if (!answer) return;

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/api/ai/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      const data = await res.json();

      setFeedback(data.feedback);
      setQuestion(data.nextQuestion);
      setLoading(false);

      // 🔊 speak feedback then next question
      speak(data.feedback);

      setTimeout(() => {
        speak(data.nextQuestion, true); // auto mic again
      }, 3500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-violet-400">🤖 AI Voice Interview</h1>
        <p className="text-gray-400 mt-2">Real-time AI interviewer with voice</p>
      </div>

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
            {loading ? "Starting..." : "Start AI Interview"}
          </button>
        </div>
      )}

      {started && (
        <div className="max-w-4xl mx-auto bg-gray-900 border border-violet-600 shadow-2xl rounded-2xl p-8 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-violet-400">🎤 Question:</h2>

          <p className="bg-black border border-violet-500 p-4 rounded text-gray-200">
            {question}
          </p>

          <div className="mt-6">
            <textarea
              className="w-full border border-violet-500 bg-black p-3 rounded text-white"
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your answer will appear here when you speak..."
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={startListening}
                className="bg-green-600 px-6 py-2 rounded"
              >
                🎤 Start Speaking
              </button>

              <button
                onClick={stopListening}
                className="bg-red-600 px-6 py-2 rounded"
              >
                🛑 Stop & Submit
              </button>
            </div>

            {listening && (
              <p className="text-green-400 mt-2 animate-pulse">
                🎙️ Listening... Speak now
              </p>
            )}
          </div>

          {feedback && (
            <div className="mt-6 bg-black border border-green-500 p-5 rounded">
              <h3 className="font-bold text-green-400 mb-2">🧠 Feedback:</h3>
              <p className="text-gray-200 whitespace-pre-line">{feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MockInterview;
