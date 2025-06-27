import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold text-blue-700">MoodPlanner</h1>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-700 focus:outline-none"
            >
              ☰
            </button>
          </div>

          <div className={`w-full md:flex md:items-center md:justify-end ${menuOpen ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 md:grid-cols-9 gap-2 text-center mt-4 md:mt-0">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link to="/mood-log" className="text-gray-700 hover:text-blue-600 font-medium">
                Mood
              </Link>
              <Link to="/chatbot" className="text-gray-700 hover:text-blue-600 font-medium">
                🤖Chatbot
              </Link>
              <Link to="/mood-history" className="text-gray-700 hover:text-blue-600 font-medium">
                Mood History
              </Link>
              <Link to="/add-task" className="text-gray-700 hover:text-blue-600 font-medium">
                Add Task
              </Link>
              <Link to="/ai-enhancer" className="text-gray-700 hover:text-blue-600 font-medium">
                AI
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
                Signup
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
