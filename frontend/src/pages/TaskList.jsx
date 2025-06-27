import { useEffect, useState } from "react";
import api from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("tasks/");
        console.log("Fetched tasks:", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("❌ Error fetching tasks:", error.response?.data || error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">📋 Your Tasks</h1>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-indigo-700">{task.title}</h2>
                    <p className="text-gray-700 mt-1">{task.description}</p>
                    <p className="text-sm text-gray-500 mt-1">📅 Date: {task.date}</p>
                  </div>
                  <span className={`mt-3 md:mt-0 px-4 py-1 rounded-full text-sm font-medium ${task.completed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {task.completed ? "✅ Completed" : "⏳ Not Completed"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
