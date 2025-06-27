import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [moods, setMoods] = useState([]);
  const [tasks, setTasks] = useState([]);

  const BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.log("No token found. Redirect to login?");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    axios.get(`${BASE_URL}/stats/`, { headers })
      .then(res => setStats(res.data))
      .catch(err => console.error("Stats fetch error:", err));

    axios.get(`${BASE_URL}/moods/`, { headers })
      .then(res => setMoods(res.data))
      .catch(err => console.error("Mood fetch error:", err));

    axios.get(`${BASE_URL}/tasks/`, { headers })
      .then(res => setTasks(res.data))
      .catch(err => console.error("Tasks fetch error:", err));
  }, []);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const COLORS = ["#10b981", "#ef4444"]; // green, red

  const taskPieData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

return (
  <div className="p-6 space-y-10 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
    <h1 className="text-4xl font-bold text-center text-indigo-800 mb-4">📊 Dashboard</h1>

    {/* Stats Summary */}
    {stats && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-indigo-300 transition">
          <h2 className="text-lg font-semibold text-indigo-600">Avg Mood (7 days)</h2>
          <p className="text-4xl font-bold text-blue-500 mt-2">{stats.average_mood_score?.toFixed(1) || "N/A"}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-yellow-300 transition">
          <h2 className="text-lg font-semibold text-indigo-600">Total Tasks</h2>
          <p className="text-4xl font-bold text-yellow-500 mt-2">{stats.total_tasks}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-green-300 transition">
          <h2 className="text-lg font-semibold text-indigo-600">Completed Tasks</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{stats.completed_tasks}</p>
        </div>
      </div>
    )}

    {/* Mood Line Chart */}
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">📈 Mood Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={moods}>
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood_score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Mood Bar Chart */}
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">📊 Mood Trend (Bar)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={moods}>
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} />
          <Tooltip />
          <Bar dataKey="mood_score" fill="#3b82f6" barSize={30} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Task Completion Pie Chart */}
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">✅ Task Completion Ratio</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={taskPieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {taskPieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Task List */}
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">📝 Your Tasks</h2>
      <ul className="divide-y divide-gray-200">
        {tasks.slice(0, 5).map(task => (
          <li key={task.id} className="py-3 flex justify-between items-center hover:bg-indigo-50 px-2 rounded transition">
            <div>
              <p className="font-medium text-gray-800">{task.title}</p>
              <p className="text-sm text-gray-500">{task.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${task.completed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {task.completed ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}