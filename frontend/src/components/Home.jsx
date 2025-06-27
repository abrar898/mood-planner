import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Home.css'; // For scroll animations

const Home = () => {
  const [moods, setMoods] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) return;

    axios.get("http://localhost:8000/api/moods/", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMoods(res.data))
      .catch(err => console.error("Failed to fetch moods:", err));

    axios.get("http://localhost:8000/api/tasks/", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTasks(res.data))
      .catch(err => console.error("Failed to fetch tasks:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow pt-20 scroll-zoom">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-6">
              Welcome to MoodPlanner
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Track your mood. Plan your day. Reflect on your mental health.
              A beautiful tool to manage emotions and productivity in one place.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all">
              Get Started
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80"
              alt="Mood Tracking"
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </main>

      {/* Embedded Video Section */}
      <section className="relative w-full h-[90vh] overflow-hidden scroll-zoom">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Experience MoodPlanner</h2>
            <p className="text-lg md:text-xl mb-6">Your mental wellness companion in motion</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* Mood Overview */}
      <section className="px-6 py-10 bg-gray-50 scroll-zoom">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center md:text-left">Mood Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
  {moods.slice(0,6).reverse().map((mood, index) => (
    <div
      key={index}
      className="flip-card group w-full h-52"
    >
      <div className="flip-inner rounded-xl shadow-md bg-white">
        {/* Front */}
        <div className="flip-front bg-blue-50 p-4 rounded-xl flex flex-col justify-center items-center text-center">
          <div className="text-3xl">
            {["😢", "😟", "😐", "😊", "😁"][mood.mood_score - 1]}
          </div>
          <p className="mt-2 text-gray-700">Mood Score: {mood.mood_score}</p>
          <p className="text-sm text-gray-500">Date: {mood.date}</p>
        </div>

        {/* Back */}
        <div className="flip-back bg-white p-4 rounded-xl flex flex-col justify-center items-center text-center">
          <h4 className="text-lg font-semibold text-blue-700">Reflection</h4>
          <p className="text-gray-600 text-sm mt-2">{mood.mood_note || "You're doing great. Keep going!"}</p>
        </div>
      </div>
    </div>
  ))}
</div>

         </section>

      {/* Task Preview Section */}
      <section className="px-6 py-10 bg-gradient-to-br from-blue-50 to-blue-100 scroll-zoom rounded-t-3xl">
        <h2 className="text-3xl font-semibold mb-8 text-blue-800 text-center">Upcoming Tasks</h2>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white text-left rounded-xl">
            <thead className="bg-blue-200 text-blue-900">
              <tr>
                <th className="py-3 px-5 font-semibold text-sm">Task</th>
                <th className="py-3 px-5 font-semibold text-sm">Due Date</th>
                <th className="py-3 px-5 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100 text-sm">
              {tasks.slice(0, 5).map((task) => (
                <tr key={task.id} className="hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-5 font-medium text-gray-800">{task.title}</td>
                  <td className="py-4 px-5 text-gray-500">{task.date}</td>
                  <td className="py-4 px-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


    </div>
  );
};

export default Home;
