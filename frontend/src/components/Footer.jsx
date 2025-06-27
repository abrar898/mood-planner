import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sky-600 to-indigo-800 text-gray-200 pt-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">MoodPlanner</h3>
          <p className="text-sm leading-relaxed">
            Track your mood, manage your day, and reflect with powerful insights — all in one place.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-200">Mood Tracking</a></li>
            <li><a href="#" className="hover:text-indigo-200">Task Management</a></li>
            <li><a href="#" className="hover:text-indigo-200">Analytics Dashboard</a></li>
            <li><a href="#" className="hover:text-indigo-200">AI Enhancer</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-200">Home</a></li>
            <li><a href="/signup" className="hover:text-indigo-200">Sign Up</a></li>
            <li><a href="/login" className="hover:text-indigo-200">Login</a></li>
            <li><a href="#" className="hover:text-indigo-200">Contact Us</a></li>
            <li><a href="#" className="hover:text-indigo-200">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@moodplanner.ai" className="hover:text-indigo-200">support@moodplanner.ai</a></li>
            <li>Phone: +92-123-4567890</li>
            <li>Location: Lahore, Pakistan</li>
          </ul>
          <div className="flex space-x-4 mt-4 text-xl text-white">
            <a href="#" className="hover:text-blue-300"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-sky-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-pink-300"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-indigo-500 text-center py-4 text-sm text-indigo-100">
        © 2025 MoodPlanner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
