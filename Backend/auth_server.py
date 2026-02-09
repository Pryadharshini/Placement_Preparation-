from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
from passlib.context import CryptContext
from jose import jwt, JWTError
import datetime

# =====================================================
# CONFIG
# =====================================================
SECRET = "SUPER_SECRET_AI_KEY"
ALGO = "HS256"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# DATABASE
# =====================================================
engine = create_engine("sqlite:///users.db")
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    streak = Column(Integer, default=1)

Base.metadata.create_all(engine)

# =====================================================
# SECURITY
# =====================================================
pwd = CryptContext(schemes=["bcrypt"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def hash_pass(p):
    return pwd.hash(p)

def verify_pass(p, hp):
    return pwd.verify(p, hp)

def create_token(data):
    payload = data.copy()
    payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    return jwt.encode(payload, SECRET, algorithm=ALGO)

def get_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGO])
        email = payload.get("email")

        db = SessionLocal()
        user = db.query(User).filter(User.email == email).first()
        db.close()

        if not user:
            raise HTTPException(status_code=401)
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# =====================================================
# MODELS
# =====================================================
class RegisterModel(BaseModel):
    name: str
    email: str
    password: str

class LoginModel(BaseModel):
    email: str
    password: str

# =====================================================
# REGISTER
# =====================================================
@app.post("/api/users")
def register(data: RegisterModel):
    db = SessionLocal()

    exists = db.query(User).filter(User.email == data.email).first()
    if exists:
        raise HTTPException(400, "User already exists")

    new_user = User(
        name=data.name,
        email=data.email,
        password=hash_pass(data.password),
        streak=1
    )

    db.add(new_user)
    db.commit()
    db.close()

    return {"msg": "Registered successfully"}

# =====================================================
# LOGIN
# =====================================================
@app.post("/api/users/auth")
def login(data: LoginModel):
    db = SessionLocal()

    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_pass(data.password, user.password):
        raise HTTPException(401, "Invalid email or password")

    token = create_token({"email": user.email})

    db.close()

    return {
        "token": token,
        "name": user.name,
        "email": user.email,
        "streak": user.streak
    }

# =====================================================
# PROFILE
# =====================================================
@app.get("/api/profile")
def profile(user: User = Depends(get_user)):
    return {
        "name": user.name,
        "email": user.email,
        "streak": user.streak
    }

# =====================================================
# DAILY PROGRESS (increase streak)
# =====================================================
@app.post("/api/daily-progress")
def update_progress(user: User = Depends(get_user)):
    db = SessionLocal()
    u = db.query(User).filter(User.email == user.email).first()

    u.streak += 1
    db.commit()

    new_streak = u.streak
    db.close()

    return {"msg": "Progress updated", "streak": new_streak}

# =====================================================
# LOGOUT
# =====================================================
@app.post("/api/logout")
def logout():
    return {"msg": "Logout success (frontend delete token)"}
