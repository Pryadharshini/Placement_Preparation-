import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [streak, setStreak] = useState(0);

  const navigate = useNavigate();
  const dropdownRef = useRef();

  // ✅ CHECK LOGIN (stay login until logout)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, []);

  // 🔥 DAILY VISIT STREAK (increase when visiting site each day)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return; // not logged in → no streak

    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("lastVisitDate");
    let currentStreak = parseInt(localStorage.getItem("visitStreak")) || 0;

    // first visit ever
    if (!lastVisit) {
      currentStreak = 1;
      localStorage.setItem("visitStreak", currentStreak);
      localStorage.setItem("lastVisitDate", today);
    }

    // new day visit → increase streak
    else if (lastVisit !== today) {
      currentStreak += 1;
      localStorage.setItem("visitStreak", currentStreak);
      localStorage.setItem("lastVisitDate", today);
    }

    setStreak(currentStreak);
  }, []);

  // close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProfile = () => {
    navigate("/app/profile");
    setOpen(false);
  };

  const goToDashboard = () => {
    navigate("/app");
    setOpen(false);
  };

  // 🔴 LOGOUT (reset login + streak)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("visitStreak");
    localStorage.removeItem("lastVisitDate");

    setIsLoggedIn(false);
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="bg-transparent backdrop-blur-md bg-black/30 text-white flex justify-between items-center px-8 py-4 fixed top-0 w-full z-50">

      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Finally Placed
      </h1>

      {/* CENTER MENU */}
      <div className="hidden md:flex gap-8 font-medium text-gray-200">
        <p onClick={()=>navigate("/app/career-tracks")} className="cursor-pointer hover:text-white">Career Tracks</p>
        <p onClick={()=>navigate("/app/resources")} className="cursor-pointer hover:text-white">Resources</p>
        <p onClick={()=>navigate("/app/dsa")} className="cursor-pointer hover:text-white">DSA Practice</p>
        <p onClick={()=>navigate("/app/mock")} className="cursor-pointer hover:text-white">Mock Interview</p>
        <p onClick={()=>navigate("/app/resume")} className="cursor-pointer hover:text-white">Resume</p>
        <p onClick={()=>navigate("/app/job")} className="cursor-pointer hover:text-white">Jobs</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center gap-4" ref={dropdownRef}>

        {/* NOT LOGGED IN */}
        {!isLoggedIn && (
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-200 hover:text-white font-medium"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition"
            >
              Register
            </button>
          </div>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <>
            {/* 🔥 STREAK UI PURPLE THEME */}
<div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-md">
  <span className="text-lg">🔥</span>
  <span className="font-bold text-purple-300">{streak}</span>
</div>

{/* 👤 PROFILE ICON PURPLE */}
<div
  onClick={() => setOpen(!open)}
  className="w-10 h-10 rounded-full cursor-pointer bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg border border-purple-400/40"
>
  P
</div>


            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 top-12 w-48 bg-white text-black rounded-xl shadow-lg p-2 z-50">
                <p onClick={goToProfile} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  Profile
                </p>

                <p 
                  onClick={() => {
                    navigate("/app/resume");
                    setOpen(false);
                  }} 
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Resume
                </p>

                <p onClick={goToDashboard} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  Dashboard
                </p>

                <hr className="my-1" />

                <p onClick={handleLogout} className="p-2 text-red-500 hover:bg-gray-100 rounded cursor-pointer">
                  Logout
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
