from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import os
import traceback
from groq import Groq
from dotenv import load_dotenv

# LOAD .env file
load_dotenv()

# GET GROQ KEY
groq_key = os.getenv("GROQ_API_KEY")
print("MY GROQ KEY =", groq_key)

# CREATE CLIENT
client = Groq(api_key=groq_key)

# FASTAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PDF TEXT EXTRACT
def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        content = page.extract_text()
        if content:
            text += content
    return text

# HOME
@app.get("/")
def home():
    return {"message": "Groq AI Resume Analyzer Running 🔥"}

# ANALYZE
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

        if not resume_text.strip():
            return {"analysis": "Could not read resume"}

        prompt = f"""
You are a professional ATS resume analyzer.

Analyze resume for role: {role}

Give output format:

ATS Score: (out of 100)

Missing Skills:
- skill1
- skill2

Strong Points:
- point1
- point2

Improvements:
- improvement1
- improvement2

Resume:
{resume_text}

Job Description:
{job_description}
"""

        completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": prompt}],
)

        result = completion.choices[0].message.content

        return {"analysis": result}

    except Exception as e:
        print("ERROR:")
        traceback.print_exc()
        return {"analysis": "Error analyzing resume"}
