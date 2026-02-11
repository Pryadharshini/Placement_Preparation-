from fastapi import APIRouter, HTTPException
from models import User, LoginUser
from database import users_collection
import bcrypt

router = APIRouter()

# 🔐 store logged user (simple session)
current_user_email = None


# ============================
# REGISTER
# ============================
@router.post("/api/users")
def register(user: User):
    existing = users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed,
        "resumeScore": 70,
        "interviews": 0,
        "lastScore": 0,
        "courses": 0,
        "streak": 1
    })

    return {"message": "User registered successfully"}


# ============================
# LOGIN
# ============================
@router.post("/api/users/auth")
def login(user: LoginUser):
    global current_user_email

    db_user = users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user["password"]):
        raise HTTPException(status_code=400, detail="Wrong password")

    # store logged user
    current_user_email = db_user["email"]

    return {
        "message": "Login success",
        "user": {
            "name": db_user["name"],
            "email": db_user["email"]
        }
    }


# ============================
# GET CURRENT USER
# ============================
@router.get("/api/users/me")
def get_me():
    global current_user_email

    if not current_user_email:
        raise HTTPException(status_code=401, detail="Not logged in")

    db_user = users_collection.find_one({"email": current_user_email})

    return {
        "name": db_user["name"],
        "email": db_user["email"]
    }


# ============================
# DASHBOARD DATA (dynamic)
# ============================
@router.get("/api/users/dashboard")
def dashboard():
    global current_user_email

    if not current_user_email:
        raise HTTPException(status_code=401, detail="Login first")

    db_user = users_collection.find_one({"email": current_user_email})

    return {
        "resumeScore": db_user.get("resumeScore", 0),
        "interviews": db_user.get("interviews", 0),
        "lastScore": db_user.get("lastScore", 0),
        "courses": db_user.get("courses", 0),
        "streak": db_user.get("streak", 1)
    }


# ============================
# LOGOUT
# ============================
@router.post("/api/users/logout")
def logout():
    global current_user_email
    current_user_email = None
    return {"message": "Logged out successfully"}
