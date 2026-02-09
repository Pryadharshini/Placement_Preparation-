from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import os
import traceback
import random
from groq import Groq
from dotenv import load_dotenv

# =========================================================
# 🔐 LOAD ENV
# =========================================================
load_dotenv()
groq_key = os.getenv("GROQ_API_KEY")

print("✅ GROQ KEY LOADED =", groq_key)

client = Groq(api_key=groq_key)

# =========================================================
# 🚀 FASTAPI INIT
# =========================================================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# 📄 PDF TEXT EXTRACT
# =========================================================
def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        content = page.extract_text()
        if content:
            text += content
    return text

# =========================================================
# 🏠 HOME
# =========================================================
@app.get("/")
def home():
    return {"message": "🔥 AI Backend Running Perfectly"}

# =========================================================
# 🧠 MEMORY (GD + INTERVIEW)
# =========================================================
gd_topic = ""
gd_history = []
interview_resume = ""

# =========================================================
# 👥 GROUP DISCUSSION TOPIC
# =========================================================
@app.get("/api/gd-topic")
def get_topic():
    global gd_topic, gd_history

    topics = [
        "Is AI replacing human jobs?",
        "Work from home vs office",
        "Social media impact on students",
        "Is coding necessary for all engineers?",
        "Future of electric vehicles",
        "Online education vs classroom",
        "Startup vs corporate jobs",
        "Women in tech leadership",
        "Impact of AI on education",
        "Should college degree be mandatory?"
    ]

    gd_topic = random.choice(topics)
    gd_history = []

    intro = f"""
Hello 👋 Welcome to AI Group Discussion.

Today's topic is: {gd_topic}

You may start speaking.
"""

    return {"topic": gd_topic, "intro": intro}

# =========================================================
# 🤖 REAL-TIME VOICE GD REPLY
# =========================================================
@app.post("/api/gd-reply")
async def gd_reply(data: dict):
    global gd_history, gd_topic

    try:
        user_msg = data.get("message")

        gd_history.append({"role": "user", "content": user_msg})

        prompt = f"""
You are a smart placement student in group discussion.

Topic: {gd_topic}

User said:
{user_msg}

Reply naturally like human GD participant.
- Agree or counter
- Add new strong point
- 2 to 3 lines only
- Encourage discussion
"""

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        reply = completion.choices[0].message.content
        gd_history.append({"role": "assistant", "content": reply})

        return {"reply": reply}

    except Exception:
        traceback.print_exc()
        return {"reply": "Interesting point. Can you explain more?"}

# =========================================================
# 📊 RESUME ANALYZER
# =========================================================
@app.post("/analyze-resume/")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(""),
    role: str = Form("")
):
    try:
        contents = await file.read()

        with open("temp.pdf", "wb") as f:
            f.write(contents)

        with open("temp.pdf", "rb") as f:
            resume_text = extract_text_from_pdf(f)

        os.remove("temp.pdf")

        prompt = f"""
You are ATS resume analyzer.

Analyze resume for role: {role}

Give:
ATS Score /100
Missing skills
Strong points
Improvements

Resume:
{resume_text}

Job description:
{job_description}
"""

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        result = completion.choices[0].message.content
        return {"analysis": result}

    except Exception:
        traceback.print_exc()
        return {"analysis": "Error analyzing resume"}

# =========================================================
# 🎤 MOCK INTERVIEW START
# =========================================================
@app.post("/api/ai/start-interview")
async def start_interview(file: UploadFile = File(...)):
    global interview_resume

    try:
        contents = await file.read()

        with open("temp_interview.pdf", "wb") as f:
            f.write(contents)

        with open("temp_interview.pdf", "rb") as f:
            interview_resume = extract_text_from_pdf(f)

        os.remove("temp_interview.pdf")

        prompt = f"""
You are professional HR interviewer.

Candidate resume:
{interview_resume}

Start interview with first question.
Ask only one question.
"""

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        question = completion.choices[0].message.content
        return {"question": question}

    except Exception:
        traceback.print_exc()
        return {"question": "Tell me about yourself"}

# =========================================================
# 🤖 INTERVIEW NEXT QUESTION + FEEDBACK
# =========================================================
@app.post("/api/ai/evaluate")
async def evaluate_answer(data: dict):
    global interview_resume

    try:
        question = data.get("question")
        answer = data.get("answer")

        prompt = f"""
You are strict HR interviewer.

Resume:
{interview_resume}

Question:
{question}

Answer:
{answer}

Give:
Feedback
Score out of 10
Next Question
"""

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        result = completion.choices[0].message.content

        if "Next Question" in result:
            parts = result.split("Next Question")
            feedback = parts[0]
            nextq = parts[1]
        else:
            feedback = result
            nextq = "Tell me about your projects."

        return {
            "feedback": feedback,
            "nextQuestion": nextq
        }

    except Exception:
        traceback.print_exc()
        return {
            "feedback": "Error",
            "nextQuestion": "Tell me about yourself"
        }
