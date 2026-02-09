import { useState, useEffect, useRef } from "react";

const GroupDiscussion = () => {
  const [chat, setChat] = useState([]);
  const [userText, setUserText] = useState("");
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const speakingRef = useRef(false);

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
  }

  // 🔊 AI SPEAK (one by one)
  const speak = (text) => {
    speechSynthesis.cancel(); // stop previous voice

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speakingRef.current = true;

    speech.onend = () => {
      speakingRef.current = false;
    };

    window.speechSynthesis.speak(speech);
  };

  // 🎤 START LISTENING (interrupt AI)
  const startListening = () => {
    if (!recognition) return alert("Use Chrome browser");

    // STOP AI speaking immediately
    speechSynthesis.cancel();

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setUserText(text);
    };

    recognition.onend = () => setListening(false);
  };

  // 🛑 STOP MIC
  const stopListening = () => {
    if (recognition) recognition.stop();
    setListening(false);
  };

  // ============================
  // START REAL GD
  // ============================
  useEffect(() => {
    startGD();
  }, []);

  const startGD = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/gd-topic");
    const data = await res.json();

    const intro = data.intro;
    addMessage("HR", intro);
    speak(intro);

    // After intro → start members
    setTimeout(startMembers, 6000);
  };

  // ============================
  // AI MEMBERS DISCUSSION
  // ============================
  const members = ["Rahul", "Priya", "Arjun", "Neha"];

  const startMembers = () => {
    let i = 0;

    const interval = setInterval(() => {
      if (speakingRef.current) return; // wait if speaking

      if (i >= members.length) {
        clearInterval(interval);
        return;
      }

      const msg = generatePoint(members[i]);
      addMessage(members[i], msg);
      speak(msg);
      i++;
    }, 7000);
  };

  const generatePoint = (name) => {
    const points = [
      "I believe online education is flexible and accessible.",
      "However classroom learning improves discipline.",
      "Both methods have advantages and disadvantages.",
      "Future may combine both online and offline.",
    ];

    return points[Math.floor(Math.random() * points.length)];
  };

  // ============================
  // USER SEND MESSAGE
  // ============================
  const sendUser = () => {
    if (!userText) return;

    speechSynthesis.cancel(); // stop AI

    addMessage("You", userText);

    // AI react to your point
    setTimeout(() => {
      const reply =
        "That's an interesting point. But can you justify it with an example?";
      addMessage("Priya", reply);
      speak(reply);
    }, 2000);

    setUserText("");
  };

  // ============================
  // ADD CHAT
  // ============================
  const addMessage = (speaker, msg) => {
    setChat((prev) => [...prev, { speaker, msg }]);
  };

  // ============================
  // UI
  // ============================
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl text-center text-blue-400 mb-6">
        👥 AI Real Group Discussion
      </h1>

      {/* CHAT BOX */}
      <div className="bg-[#0f172a] p-6 rounded h-[400px] overflow-y-auto">
        {chat.map((c, i) => (
          <p key={i} className="mb-3">
            <span className="text-blue-400 font-bold">{c.speaker}: </span>
            {c.msg}
          </p>
        ))}
      </div>

      {/* INPUT */}
      <textarea
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="Interrupt and speak anytime..."
        className="w-full mt-6 p-4 bg-black border rounded"
      />

      {/* BUTTONS */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={startListening}
          className="bg-green-600 px-6 py-2 rounded"
        >
          🎤 Speak
        </button>

        <button
          onClick={stopListening}
          className="bg-red-600 px-6 py-2 rounded"
        >
          🛑 Stop
        </button>

        <button
          onClick={sendUser}
          className="bg-yellow-600 px-6 py-2 rounded"
        >
          Send
        </button>
      </div>

      {listening && (
        <p className="text-green-400 mt-2 animate-pulse">
          🎙️ Listening... interrupting discussion
        </p>
      )}
    </div>
  );
};

export default GroupDiscussion;
