import { useState } from "react";
import api from "../api"; // ✅ Use centralized axios instance

export default function TaskAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("tasks/", {
        title,
        description,
        date,
      });

      alert("✅ Task added successfully");
      setTitle("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("❌ Error adding task:", error.response?.data || error.message);
      alert("Error adding task: " + JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">📝 Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
