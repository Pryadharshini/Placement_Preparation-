import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
  { name: "Career Tracks", path: "/app/career-tracks" },
  { name: "Resources", path: "/app/resources" },
  { name: "DSA Practice", path: "/app/dsa" },
  { name: "Mock Interview", path: "/app/mock" },
  { name: "Resume", path: "/app/resume" },
  { name: "Jobs", path: "/app/job" },
];

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-transparent text-white py-4 px-6 md:px-8 flex items-center justify-between z-50">
      
      {/* Logo */}
      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Finally Placed
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8 text-gray-300">
        {navItems.map((item) => (
          <li
            key={item.name}
            className="hover:text-white transition duration-300 cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center space-x-6">
        <button
          onClick={() => navigate("/login")}
          className="text-gray-300 hover:text-white transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="text-gray-300 hover:text-white transition"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-[#3a1c63] hover:bg-[#50228a] text-white py-2 px-4 rounded-lg shadow-lg transition"
        >
          Start free trial
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0a0a0a] bg-opacity-95 p-6 shadow-lg md:hidden flex flex-col space-y-4">
          {navItems.map((item) => (
            <span
              key={item.name}
              className="text-gray-300 hover:text-white cursor-pointer"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              {item.name}
            </span>
          ))}

          <button
            onClick={() => navigate("/login")}
            className="text-gray-300 hover:text-white text-left"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-[#3a1c63] hover:bg-[#50228a] text-white py-2 px-4 rounded-lg"
          >
            Start free trial
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
