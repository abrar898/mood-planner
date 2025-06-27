import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Signup successful ✅");
      } else {
        alert(data.error || "Signup failed ❌");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
